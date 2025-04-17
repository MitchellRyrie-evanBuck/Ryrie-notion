import React, { useState, useEffect } from "react";
import { NotionPageHeader } from '@/components/NotionPageHeader';
import { useRouter } from 'next/router';
import { resolveNotionPage } from '@/lib/resolve-notion-page';
import { domain } from '@/lib/config';
import { PageHead } from '@/components/PageHead';
import { DynamicBackground } from '@/components/DynamicBackground';
import { motion } from "framer-motion";
import { mapImageUrl } from '@/lib/map-image-url';
import { useDarkMode } from '@/lib/use-dark-mode';
import BodyClassName from 'react-body-classname';
import { FocusCards } from "@/components/ui/focus-cards";
import { TypewriterEffect } from "@/components/ui/typewriter-effect";
import clsx from 'clsx';
import styles from '@/components/styles.module.css';
import { RyrieFooter } from '@/components/ryrie/RyrieFooter';
import Image from 'next/image';
import { ExtendedRecordMap } from 'notion-types';
import { parsePageId } from 'notion-utils';

// Define notion page ID for "More" content
// Use a specific collection page from your Notion workspace

// Page transition animation variants
const pageTransitionVariants = {
  initial: {
    opacity: 0,
    y: 20
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.6, -0.05, 0.01, 0.99]
    }
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.4
    }
  }
};

// Content category definitions
const contentCategories = [
  { id: 'all', label: 'All Content' },
  { id: 'web3', label: 'Web3' },
  { id: 'tech', label: 'Technology' },
  { id: 'apple', label: 'Apple' },
  { id: 'design', label: 'Design' }
];

// Interface for content item structure
interface ContentItem {
  id: string;
  title: string;
  description: string;
  coverImage: string | null;
  tags: string[];
  category: string;
  url: string;
}

export default function MorePage({ site, recordMap, error, pageId }) {
  const router = useRouter();
  const { isDarkMode } = useDarkMode();
  const [activeCategory, setActiveCategory] = useState('all');
  const [contentItems, setContentItems] = useState<ContentItem[]>([]);
  const [displayType, setDisplayType] = useState('cards'); // 'cards', 'grid', 'list'

  // Header animation words
  const words = [
    { text: "Explore" },
    { text: "more" },
    { text: "content" },
    { text: "on" },
    { text: "Ryrie.", className: "text-blue-500 dark:text-blue-500" },
  ];

  useEffect(() => {
    // Parse and format content from recordMap
    if (recordMap?.block) {
      const collections = getCollectionsFromRecordMap(recordMap);
      setContentItems(collections);
    }
  }, [recordMap]);

  // Filter content items based on active category
  const filteredItems = contentItems.filter(item => {
    if (activeCategory === 'all') return true;
    return item.category === activeCategory || item.tags?.includes(activeCategory);
  });

  // Function to extract collections from recordMap
  function getCollectionsFromRecordMap(recordMap: ExtendedRecordMap): ContentItem[] {
    const collections: ContentItem[] = [];
    try {
      // Get collection data from recordMap
      const collectionIds = Object.keys(recordMap?.collection || {});

      collectionIds.forEach(collectionId => {
        const collection = recordMap.collection[collectionId]?.value;

        if (collection) {
          // Get blocks that belong to this collection
          const blocks = Object.values(recordMap?.block || {})
            .filter(block => {
              const value = block?.value;
              return value?.parent_id === collectionId && value?.type === 'page';
            })
            .map(block => {
              const value = block?.value;
              const properties = value?.properties || {};

              // Extract properties
              const title = properties?.title?.[0]?.[0] || 'Untitled';
              const description = properties?.description?.[0]?.[0] || '';
              const coverImage = value?.format?.page_cover
                ? mapImageUrl(value.format.page_cover, value)
                : null;

              // Try to extract tags and category from properties
              // The actual property keys may vary based on your Notion schema
              let tags: string[] = [];
              let category = 'general';

              // Look for tags in properties
              Object.entries(properties).forEach(([key, val]) => {
                if (key.toLowerCase().includes('tag') && Array.isArray(val) && val.length > 0) {
                  const tagStr = val[0]?.[0];
                  if (tagStr) {
                    tags = tagStr.split(',').map(tag => tag.trim());
                  }
                }

                if (key.toLowerCase().includes('categor') && Array.isArray(val) && val.length > 0) {
                  category = val[0]?.[0] || 'general';
                }
              });

              return {
                id: value.id,
                title,
                description,
                coverImage,
                tags,
                category,
                url: `/${value.id}` // Link to individual page
              };
            });

          collections.push(...blocks);
        }
      });

      // If no blocks found, also check for standalone pages
      if (collections.length === 0) {
        const pages = Object.values(recordMap?.block || {})
          .filter(block => {
            const value = block?.value;
            return value?.type === 'page' && !value?.parent_table?.includes('collection');
          })
          .map(block => {
            const value = block?.value;
            const properties = value?.properties || {};

            return {
              id: value.id,
              title: properties?.title?.[0]?.[0] || 'Untitled',
              description: '',
              coverImage: value?.format?.page_cover
                ? mapImageUrl(value.format.page_cover, value)
                : null,
              tags: [],
              category: 'general',
              url: `/${value.id}`
            };
          });

        collections.push(...pages);
      }
    } catch (error) {
      console.error('Error parsing collection data:', error);
    }

    // If no collections found, provide some default items
    if (collections.length === 0) {
      return [
        {
          id: '1',
          title: 'Web3 Development',
          description: 'Exploring the world of decentralized applications',
          coverImage: 'https://images.unsplash.com/photo-1639762681057-408e52192e55?q=80&w=3432&auto=format&fit=crop',
          tags: ['web3', 'blockchain'],
          category: 'web3',
          url: '/web3'
        },
        {
          id: '2',
          title: 'Apple Ecosystem',
          description: 'The latest on Apple products and services',
          coverImage: 'https://images.unsplash.com/photo-1491933382434-500287f9b54b?q=80&w=3564&auto=format&fit=crop',
          tags: ['tech', 'apple'],
          category: 'apple',
          url: '/apple'
        },
        {
          id: '3',
          title: 'Design Principles',
          description: 'Key fundamentals of good design',
          coverImage: 'https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=3564&auto=format&fit=crop',
          tags: ['design', 'ux'],
          category: 'design',
          url: '/design'
        },
        {
          id: '4',
          title: 'Technology Trends',
          description: 'Emerging technologies and their impact',
          coverImage: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=3420&auto=format&fit=crop',
          tags: ['tech', 'trends'],
          category: 'tech',
          url: '/tech'
        }
      ];
    }

    return collections;
  }

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageTransitionVariants}
    >
      {isDarkMode && <BodyClassName className='dark-mode' />}

      <PageHead
        site={site}
        title="More Content | Ryrie"
        description="Explore more content and resources on various topics"
      />

      <DynamicBackground coverImage={null} />

      <div className={clsx('notion', styles.notion)}>
        <NotionPageHeader block={null} />

        <div className="flex flex-col justify-center items-center px-4 py-10 md:px-6">
          {/* Page Title Animation */}
          <div className="my-8">
            <TypewriterEffect words={words} />
          </div>

          {/* Category Navigation */}
          <div className="flex flex-wrap gap-3 justify-center mb-10">
            {contentCategories.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all
                  ${activeCategory === category.id
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
              >
                {category.label}
              </button>
            ))}
          </div>

          {/* Display Type Toggle */}
          <div className="flex gap-2 mb-8">
            <button
              onClick={() => setDisplayType('cards')}
              className={`p-2 rounded ${displayType === 'cards' ? 'bg-blue-500 text-white' : 'bg-gray-100 dark:bg-gray-800'}`}
              title="Cards View"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </button>
            <button
              onClick={() => setDisplayType('grid')}
              className={`p-2 rounded ${displayType === 'grid' ? 'bg-blue-500 text-white' : 'bg-gray-100 dark:bg-gray-800'}`}
              title="Grid View"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
            </button>
            <button
              onClick={() => setDisplayType('list')}
              className={`p-2 rounded ${displayType === 'list' ? 'bg-blue-500 text-white' : 'bg-gray-100 dark:bg-gray-800'}`}
              title="List View"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

          {/* Content Display */}
          {displayType === 'cards' && (
            <FocusCards
              cards={filteredItems.map(item => ({
                title: item.title,
                src: item.coverImage || '',
                description: item.description,
                tags: item.tags,
                url: item.url
              }))}
            />
          )}

          {displayType === 'grid' && (
            <div className="grid grid-cols-1 gap-6 w-full max-w-6xl md:grid-cols-2 lg:grid-cols-3">
              {filteredItems.map(item => (
                <div
                  key={item.id}
                  className="overflow-hidden bg-white rounded-lg shadow-md transition-shadow duration-300 cursor-pointer dark:bg-gray-800 hover:shadow-lg"
                  onClick={() => router.push(item.url)}
                >
                  <div className="overflow-hidden relative h-48">
                    {item.coverImage && (
                      <Image
                        src={item.coverImage}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="mb-2 text-lg font-bold">{item.title}</h3>
                    <p className="mb-3 text-sm text-gray-600 dark:text-gray-300">{item.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {item.tags?.map(tag => (
                        <span key={tag} className="px-2 py-1 text-xs bg-gray-100 rounded dark:bg-gray-700">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {displayType === 'list' && (
            <div className="space-y-4 w-full max-w-4xl">
              {filteredItems.map(item => (
                <div
                  key={item.id}
                  className="flex flex-col gap-4 p-4 bg-white rounded-lg shadow transition-shadow duration-300 cursor-pointer md:flex-row dark:bg-gray-800 hover:shadow-md"
                  onClick={() => router.push(item.url)}
                >
                  {item.coverImage && (
                    <div className="relative flex-shrink-0 w-full h-32 md:w-32">
                      <Image
                        src={item.coverImage}
                        alt={item.title}
                        fill
                        className="object-cover rounded"
                      />
                    </div>
                  )}
                  <div className="flex-1">
                    <h3 className="mb-2 text-lg font-bold">{item.title}</h3>
                    <p className="mb-3 text-sm text-gray-600 dark:text-gray-300">{item.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {item.tags?.map(tag => (
                        <span key={tag} className="px-2 py-1 text-xs bg-gray-100 rounded dark:bg-gray-700">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Empty State */}
          {filteredItems.length === 0 && (
            <div className="p-10 text-center">
              <h3 className="text-xl font-semibold">No content found</h3>
              <p className="mt-2 text-gray-500 dark:text-gray-400">
                Try selecting a different category or check back later.
              </p>
            </div>
          )}
        </div>

        <RyrieFooter />
      </div>
    </motion.div>
  );
}
