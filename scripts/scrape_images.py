#!/usr/bin/env python3
"""
Image Scraper Script
Downloads all images from a specified website URL
"""

import os
import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin, urlparse
import time

class ImageScraper:
    def __init__(self, url, output_folder='scraped_images'):
        self.url = url
        self.output_folder = output_folder
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        })
        
        # Create output folder if it doesn't exist
        if not os.path.exists(output_folder):
            os.makedirs(output_folder)
            print(f"✓ Created folder: {output_folder}")
    
    def get_image_urls(self):
        """Extract all image URLs from the webpage"""
        try:
            print(f"\n🔍 Fetching webpage: {self.url}")
            response = self.session.get(self.url, timeout=10)
            response.raise_for_status()
            
            soup = BeautifulSoup(response.content, 'html.parser')
            
            # Find all img tags
            img_tags = soup.find_all('img')
            print(f"✓ Found {len(img_tags)} image tags")
            
            image_urls = []
            for img in img_tags:
                # Get src or data-src (for lazy-loaded images)
                img_url = img.get('src') or img.get('data-src') or img.get('data-lazy-src')
                
                if img_url:
                    # Convert relative URLs to absolute
                    full_url = urljoin(self.url, img_url)
                    image_urls.append(full_url)
            
            # Remove duplicates
            image_urls = list(set(image_urls))
            print(f"✓ Found {len(image_urls)} unique images")
            
            return image_urls
            
        except Exception as e:
            print(f"❌ Error fetching webpage: {e}")
            return []
    
    def download_image(self, img_url, index):
        """Download a single image"""
        try:
            # Get the image
            response = self.session.get(img_url, timeout=10, stream=True)
            response.raise_for_status()
            
            # Get file extension from URL or content-type
            parsed_url = urlparse(img_url)
            ext = os.path.splitext(parsed_url.path)[1]
            
            if not ext or ext not in ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg']:
                content_type = response.headers.get('content-type', '')
                if 'jpeg' in content_type or 'jpg' in content_type:
                    ext = '.jpg'
                elif 'png' in content_type:
                    ext = '.png'
                elif 'gif' in content_type:
                    ext = '.gif'
                elif 'webp' in content_type:
                    ext = '.webp'
                else:
                    ext = '.jpg'  # default
            
            # Create filename
            filename = f"image_{index:03d}{ext}"
            filepath = os.path.join(self.output_folder, filename)
            
            # Save the image
            with open(filepath, 'wb') as f:
                for chunk in response.iter_content(chunk_size=8192):
                    f.write(chunk)
            
            print(f"  ✓ Downloaded: {filename}")
            return True
            
        except Exception as e:
            print(f"  ❌ Failed to download {img_url}: {e}")
            return False
    
    def scrape(self, delay=0.5):
        """Main scraping function"""
        print("\n" + "="*60)
        print("🖼️  IMAGE SCRAPER")
        print("="*60)
        
        # Get all image URLs
        image_urls = self.get_image_urls()
        
        if not image_urls:
            print("\n❌ No images found!")
            return
        
        # Download images
        print(f"\n📥 Downloading {len(image_urls)} images...")
        print("-" * 60)
        
        success_count = 0
        for index, img_url in enumerate(image_urls, 1):
            if self.download_image(img_url, index):
                success_count += 1
            
            # Add delay to be respectful to the server
            if index < len(image_urls):
                time.sleep(delay)
        
        # Summary
        print("-" * 60)
        print(f"\n✅ Successfully downloaded: {success_count}/{len(image_urls)} images")
        print(f"📁 Saved to: {os.path.abspath(self.output_folder)}")
        print("="*60 + "\n")


def main():
    """Main function with example usage"""
    
    # Example: Scrape images from a website
    url = input("Enter the website URL to scrape images from: ").strip()
    
    if not url:
        print("❌ No URL provided!")
        return
    
    # Add http:// if not present
    if not url.startswith(('http://', 'https://')):
        url = 'https://' + url
    
    # Optional: Custom output folder
    custom_folder = input("Enter output folder name (press Enter for 'scraped_images'): ").strip()
    output_folder = custom_folder if custom_folder else 'scraped_images'
    
    # Create scraper and run
    scraper = ImageScraper(url, output_folder)
    scraper.scrape()


if __name__ == "__main__":
    main()
