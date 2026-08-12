'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

interface DashboardCardProps {
  title: string;
  value?: string | number;
  icon?: ReactNode;
  description?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  action?: ReactNode;
  className?: string;
  children?: ReactNode;
}

export function DashboardCard({
  title,
  value,
  icon,
  description,
  trend,
  action,
  className,
  children,
}: DashboardCardProps) {
  return (
    <Card className={cn('', className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        {icon && <div className="text-muted-foreground">{icon}</div>}
      </CardHeader>
      <CardContent>
        {children || (
          <>
            {value !== undefined && (
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold">{value}</span>
                {trend && (
                  <span
                    className={cn(
                      'text-xs',
                      trend.isPositive ? 'text-success' : 'text-destructive'
                    )}
                  >
                    {trend.isPositive ? '+' : '-'}
                    {Math.abs(trend.value)}%
                  </span>
                )}
              </div>
            )}
            {description && <p className="mt-1 text-xs text-muted-foreground">{description}</p>}
            {action && <div className="mt-3">{action}</div>}
          </>
        )}
      </CardContent>
    </Card>
  );
}

interface StatCardProps {
  title: string;
  value: string | number;
  icon?: ReactNode;
  description?: string;
  className?: string;
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'destructive';
}

const variantStyles = {
  default: '',
  primary: 'border-primary/20 bg-primary/5',
  success: 'border-success/20 bg-success/5',
  warning: 'border-warning/20 bg-warning/5',
  destructive: 'border-destructive/20 bg-destructive/5',
};

const iconVariantStyles = {
  default: 'text-muted-foreground',
  primary: 'text-primary',
  success: 'text-success',
  warning: 'text-warning',
  destructive: 'text-destructive',
};

export function StatCard({
  title,
  value,
  icon,
  description,
  className,
  variant = 'default',
}: StatCardProps) {
  return (
    <Card className={cn(variantStyles[variant], className)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-3xl font-bold tracking-tight">{value}</p>
            {description && <p className="text-xs text-muted-foreground">{description}</p>}
          </div>
          {icon && (
            <div className={cn('rounded-full bg-muted p-3', iconVariantStyles[variant])}>
              {icon}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
