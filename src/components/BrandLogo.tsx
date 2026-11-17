import React from 'react';

interface BrandLogoProps {
  variant?: 'light' | 'dark' | 'gold';
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = 'dark',
  size = 'md',
  showSubtitle = true
}) => {
  const isLight = variant === 'light';

  const logoSizes = {
    sm: { icon: 'w-7 h-7', title: 'text-lg', subtitle: 'text-[9px]' },
    md: { icon: 'w-10 h-10', title: 'text-2xl', subtitle: 'text-[11px]' },
    lg: { icon: 'w-14 h-14', title: 'text-3xl md:text-4xl', subtitle: 'text-xs md:text-sm' }
  };

  const { icon, title, subtitle } = logoSizes[size];

  return (
    <div className="flex items-center gap-3 select-none">
      {/* Luxury Coastal Crest Monogram */}
      <div className={`relative ${icon} shrink-0 flex items-center justify-center rounded-full bg-gradient-to-br from-[#0B192C] via-[#152A4A] to-[#070F1A] border-2 border-[#C5A059] shadow-md`}>
        <svg viewBox="0 0 100 100" className="w-full h-full p-1" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Subtle Outer Starburst ring */}
          <circle cx="50" cy="50" r="44" stroke="#C5A059" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />
          {/* Wave Arch */}
          <path d="M22 65 C35 55, 65 75, 78 65" stroke="#E6C280" strokeWidth="2.5" strokeLinecap="round" />
          {/* Golden Fleur / Star Emblem */}
          <path d="M50 18 L53 32 L67 32 L56 41 L60 55 L50 46 L40 55 L44 41 L33 32 L47 32 Z" fill="url(#goldGrad)" />
          {/* Monogram Moniker */}
          <text x="50" y="80" textAnchor="middle" fill="#FAF8F5" fontFamily="serif" fontSize="18" fontWeight="bold" letterSpacing="1.5">LB</text>
          <defs>
            <linearGradient id="goldGrad" x1="33" y1="18" x2="67" y2="55" gradientUnits="userSpaceOnUse">
              <stop stopColor="#F9E29D" />
              <stop offset="0.5" stopColor="#C5A059" />
              <stop offset="1" stopColor="#9A7730" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Typography Hierarchy */}
      <div className="flex flex-col">
        <div className="flex items-center gap-1.5">
          <span className={`font-serif tracking-wide font-bold ${title} ${isLight ? 'text-white' : 'text-[#0B192C]'}`}>
            Le Boulevard
          </span>
          <span className="text-[#C5A059] text-xs transform -translate-y-1">★</span>
        </div>
        {showSubtitle && (
          <div className="flex flex-col">
            <span className={`font-medium tracking-[0.18em] uppercase ${subtitle} text-[#C5A059]`}>
              Hotel Atithi — TGI Grand
            </span>
            <span className={`text-[9px] tracking-wider italic ${isLight ? 'text-slate-300' : 'text-slate-500'}`}>
              Puducherry • By The Sea
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
