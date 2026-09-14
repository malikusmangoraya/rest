```jsx
import React, { useState } from 'react';
import { ShoppingBag, X, Zap } from 'lucide-react';
import Button from '@/components/ui/Button';
import IconButton from '@/components/ui/IconButton';
import { openLemonSqueezyCheckout } from '@/services/lemonSqueezy';

export default function BuyTemplateBanner({
  templateName = 'rest',
  price = '$49',
  checkoutUrl = '',
}) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  const handleBuy = () => {
    openLemonSqueezyCheckout({
      checkoutUrl,
      customData: { product: templateName, price },
      onSuccess: () => {
        if (typeof window !== 'undefined') {
          window.alert(`Thank you for purchasing ${templateName}!`);
        }
      },
    });
  };

  return (
    <div className="fixed top-0 inset-x-0 z-[60] bg-gradient-to-r from-cyan-600 via-indigo-600 to-violet-600 px-4 py-2 text-white shadow-xl">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 text-xs sm:text-sm font-medium">
        <div className="flex items-center gap-2 truncate">
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/20">
            <Zap className="h-3.5 w-3.5" />
          </span>
          <span className="truncate">
            Previewing <strong>{templateName}</strong> • Commercial License &amp; Full Code Access
          </span>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Button
            type="button"
            variant="primary"
            size="xs"
            onClick={handleBuy}
            leftIcon={<ShoppingBag className="h-3.5 w-3.5 text-cyan-600" />}
            className="bg-white text-slate-950 hover:bg-slate-100 font-bold shadow transition-all active:scale-95"
          >
            Buy Template • {price}
          </Button>
          <IconButton
            icon={X}
            label="Dismiss banner"
            variant="ghost"
            size="sm"
            onClick={() => setDismissed(true)}
            className="text-white/80 hover:text-white p-1"
          />
        </div>
      </div>
    </div>
  );
}
```