import { Badge } from '@/components/ui/badge';

interface ProductDescriptionProps {
  description: string | null;
  shortDescription: string | null;
  tags: string[];
}

export function ProductDescription({
  description,
  shortDescription,
  tags,
}: ProductDescriptionProps) {
  return (
    <div className="space-y-6">
      {shortDescription && <p className="text-lg text-muted-foreground">{shortDescription}</p>}

      {description ? (
        <div className="prose prose-sm dark:prose-invert max-w-none">
          <div dangerouslySetInnerHTML={{ __html: description }} />
        </div>
      ) : (
        <p className="text-muted-foreground">Deskripsi produk belum tersedia.</p>
      )}

      {tags.length > 0 && (
        <div>
          <h4 className="mb-2 text-sm font-semibold">Tags</h4>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
