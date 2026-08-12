import Link from 'next/link';
import Image from 'next/image';
import { Button, ButtonProps } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface HeroBannerProps {
  title: string;
  subtitle?: string;
  description?: string;
  primaryCta?: {
    label: string;
    href: string;
  };
  secondaryCta?: {
    label: string;
    href: string;
  };
  image?: string;
  imageAlt?: string;
  className?: string;
  contentPosition?: 'left' | 'center' | 'right';
  overlay?: boolean;
}

export function HeroBanner({
  title,
  subtitle,
  description,
  primaryCta,
  secondaryCta,
  image,
  imageAlt,
  className,
  contentPosition = 'left',
  overlay = true,
}: HeroBannerProps) {
  const positionClasses = {
    left: 'items-start text-left',
    center: 'items-center text-center',
    right: 'items-end text-right',
  };

  return (
    <section className={cn('relative min-h-[400px] md:min-h-[500px] lg:min-h-[600px]', className)}>
      {image && (
        <div className="absolute inset-0">
          <Image
            src={image}
            alt={imageAlt || title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          {overlay && (
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
          )}
        </div>
      )}
      <div className="container relative mx-auto flex h-full min-h-[400px] items-center px-4 md:min-h-[500px] lg:min-h-[600px]">
        <div
          className={cn(
            'flex w-full max-w-xl flex-col gap-4 py-12',
            positionClasses[contentPosition]
          )}
        >
          {subtitle && (
            <span className="text-sm font-medium uppercase tracking-wider text-primary">
              {subtitle}
            </span>
          )}
          <h1 className="text-3xl font-bold text-white md:text-4xl lg:text-5xl">{title}</h1>
          {description && <p className="text-base text-white/80 md:text-lg">{description}</p>}
          <div className="mt-4 flex flex-wrap gap-3">
            {primaryCta && (
              <Button asChild size="lg">
                <Link href={primaryCta.href}>{primaryCta.label}</Link>
              </Button>
            )}
            {secondaryCta && (
              <Button
                asChild
                size="lg"
                variant={image ? 'outline' : 'secondary'}
                className={image ? 'border-white text-white hover:bg-white/10' : ''}
              >
                <Link href={secondaryCta.href}>{secondaryCta.label}</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

interface PromoBannerProps {
  title: string;
  description?: string;
  cta?: {
    label: string;
    href: string;
  };
  badge?: string;
  variant?: ButtonProps['variant'];
  className?: string;
}

export function PromoBanner({
  title,
  description,
  cta,
  badge,
  variant = 'default',
  className,
}: PromoBannerProps) {
  return (
    <div className={cn('rounded-lg bg-muted p-6 md:p-8', className)}>
      {badge && (
        <span className="mb-2 inline-block rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
          {badge}
        </span>
      )}
      <h3 className="text-xl font-bold text-foreground md:text-2xl">{title}</h3>
      {description && <p className="mt-2 text-muted-foreground">{description}</p>}
      {cta && (
        <Button className="mt-4" variant={variant} asChild>
          <Link href={cta.href}>{cta.label}</Link>
        </Button>
      )}
    </div>
  );
}
