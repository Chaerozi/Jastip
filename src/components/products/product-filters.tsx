'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Slider } from '@/components/ui/slider';

const categories = [
  { id: 'elektronik', label: 'Elektronik' },
  { id: 'fashion', label: 'Fashion' },
  { id: 'rumah-tangga', label: 'Rumah Tangga' },
  { id: 'otomotif', label: 'Otomotif' },
  { id: 'kecantikan', label: 'Kecantikan' },
  { id: 'kesehatan', label: 'Kesehatan' },
];

const ratings = [
  { value: 4, label: '4 ke atas' },
  { value: 3, label: '3 ke atas' },
  { value: 2, label: '2 ke atas' },
];

export function ProductFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    const params = new URLSearchParams(searchParams.toString());
    const categories = params.getAll('category');

    if (checked) {
      params.append('category', categoryId);
    } else {
      const newCategories = categories.filter((c) => c !== categoryId);
      params.delete('category');
      newCategories.forEach((c) => params.append('category', c));
    }

    params.delete('page');
    router.push(`/products?${params.toString()}`);
  };

  const handleRatingChange = (rating: number, checked: boolean) => {
    const params = new URLSearchParams(searchParams.toString());

    if (checked) {
      params.set('minRating', String(rating));
    } else {
      params.delete('minRating');
    }

    params.delete('page');
    router.push(`/products?${params.toString()}`);
  };

  const handlePriceChange = (values: number[]) => {
    const params = new URLSearchParams(searchParams.toString());
    const min = values[0] ?? 0;
    const max = values[1] ?? 10000;

    if (min > 0) {
      params.set('minPrice', String(min * 1000));
    } else {
      params.delete('minPrice');
    }

    if (max < 10000) {
      params.set('maxPrice', String(max * 1000));
    } else {
      params.delete('maxPrice');
    }

    params.delete('page');
    router.push(`/products?${params.toString()}`);
  };

  const handleInStockChange = (checked: boolean) => {
    const params = new URLSearchParams(searchParams.toString());

    if (checked) {
      params.set('inStock', 'true');
    } else {
      params.delete('inStock');
    }

    params.delete('page');
    router.push(`/products?${params.toString()}`);
  };

  const clearFilters = () => {
    router.push('/products');
  };

  const selectedCategories = searchParams.getAll('category');
  const minRating = Number(searchParams.get('minRating')) || 0;
  const inStock = searchParams.get('inStock') === 'true';

  return (
    <div className="space-y-6">
      {/* Categories */}
      <div>
        <h3 className="mb-3 font-medium">Kategori</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center space-x-2">
              <Checkbox
                id={category.id}
                checked={selectedCategories.includes(category.id)}
                onCheckedChange={(checked) => handleCategoryChange(category.id, checked === true)}
              />
              <Label htmlFor={category.id} className="cursor-pointer text-sm font-normal">
                {category.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Price Range */}
      <div>
        <h3 className="mb-3 font-medium">Harga</h3>
        <div className="px-2">
          <Slider
            defaultValue={[0, 10000]}
            max={10000}
            step={100}
            onValueCommit={handlePriceChange}
            className="mb-4"
          />
          <div className="flex items-center gap-2">
            <Input type="number" placeholder="Min" className="h-8" />
            <span>-</span>
            <Input type="number" placeholder="Max" className="h-8" />
          </div>
        </div>
      </div>

      <Separator />

      {/* Rating */}
      <div>
        <h3 className="mb-3 font-medium">Rating</h3>
        <div className="space-y-2">
          {ratings.map((rating) => (
            <div key={rating.value} className="flex items-center space-x-2">
              <Checkbox
                id={`rating-${rating.value}`}
                checked={minRating === rating.value}
                onCheckedChange={(checked) => handleRatingChange(rating.value, checked === true)}
              />
              <Label
                htmlFor={`rating-${rating.value}`}
                className="cursor-pointer text-sm font-normal"
              >
                {rating.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Availability */}
      <div>
        <h3 className="mb-3 font-medium">Ketersediaan</h3>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="in-stock"
            checked={inStock}
            onCheckedChange={(checked) => handleInStockChange(checked === true)}
          />
          <Label htmlFor="in-stock" className="cursor-pointer text-sm font-normal">
            Stok Tersedia
          </Label>
        </div>
      </div>

      {/* Clear Filters */}
      <Button variant="outline" className="w-full" onClick={clearFilters}>
        Hapus Semua Filter
      </Button>
    </div>
  );
}
