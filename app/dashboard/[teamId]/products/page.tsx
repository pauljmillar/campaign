'use client'

import { useState } from 'react'
import TypesenseInstantSearchAdapter from 'typesense-instantsearch-adapter'
import { InstantSearch, SearchBox, Hits, RefinementList } from 'react-instantsearch-hooks-web'
import { Product, ProductHit } from '@/types/product'
import type { BaseHit } from 'instantsearch.js'
// Update Typesense configuration
const typesenseInstantsearchAdapter = new TypesenseInstantSearchAdapter({
  server: {
    apiKey: process.env.NEXT_PUBLIC_TYPESENSE_SEARCH_KEY!,
    nodes: [
      {
        host: process.env.NEXT_PUBLIC_TYPESENSE_HOST!,
        port: parseInt(process.env.NEXT_PUBLIC_TYPESENSE_PORT!),
        protocol: process.env.NEXT_PUBLIC_TYPESENSE_PROTOCOL!,
      },
    ],
  },
  additionalSearchParameters: {
    query_by: 'name,description,company,industry,sub-industry,channel',
  },
})

const searchClient = typesenseInstantsearchAdapter.searchClient

export default function Page() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Products Page</h1>
      
      <InstantSearch
        searchClient={searchClient}
        indexName="products"
      >
        <div className="grid grid-cols-12 gap-6">
          {/* Filters sidebar */}
          <div className="col-span-3 space-y-4">
            <div className="border p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Company</h3>
              <RefinementList attribute="company" />
            </div>
            <div className="border p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Industry</h3>
              <RefinementList attribute="industry" />
            </div>
            <div className="border p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Sub-Industry</h3>
              <RefinementList attribute="sub-industry" />
            </div>
            <div className="border p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Channel</h3>
              <RefinementList attribute="channel" />
            </div>
          </div>

          {/* Search results */}
          <div className="col-span-9">
            <SearchBox
              placeholder="Search products..."
              className="mb-4"
            />
            <Hits
              classNames={{
                list: 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'
              }}
              hitComponent={({ hit }: { hit: ProductHit & BaseHit }) => (
                <div className="border p-4 rounded-lg shadow hover:shadow-md transition-shadow">
                  <h2 className="font-semibold truncate">{hit.name}</h2>
                  <p className="text-gray-600 text-sm line-clamp-2">{hit.description}</p>
                  <p className="text-sm text-gray-500 mt-2">{hit.company}</p>
                  <p className="text-sm text-gray-500">{hit.industry}</p>
                </div>
              )}
            />
          </div>
        </div>
      </InstantSearch>
    </div>
  )
}