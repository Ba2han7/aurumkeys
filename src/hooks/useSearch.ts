import { useState } from 'react';
import { useProducts } from './useProducts';

export const useSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  
  const { data: searchResults = [], isLoading } = useProducts(
    undefined, 
    undefined, 
    searchQuery || undefined
  );

  const startSearch = (query: string) => {
    setSearchQuery(query);
    setIsSearching(true);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setIsSearching(false);
  };

  return {
    searchQuery,
    searchResults,
    isSearching,
    isLoading,
    startSearch,
    clearSearch,
  };
};