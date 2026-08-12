import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface ProductSortProps {
  value: string;
  onValueChange: (value: string) => void;
}

const sortOptions = [
  { value: 'newest', label: 'Terbaru' },
  { value: 'oldest', label: 'Terlama' },
  { value: 'price-asc', label: 'Harga Terendah' },
  { value: 'price-desc', label: 'Harga Tertinggi' },
  { value: 'rating', label: 'Rating Tertinggi' },
  { value: 'popular', label: 'Terpopuler' },
];

export function ProductSort({ value, onValueChange }: ProductSortProps) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Urutkan" />
      </SelectTrigger>
      <SelectContent>
        {sortOptions.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
