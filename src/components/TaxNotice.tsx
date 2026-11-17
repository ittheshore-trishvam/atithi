import React from 'react';
import { Info, Receipt } from 'lucide-react';

interface TaxNoticeProps {
  taxNotice?: string;
  gstPercentage?: number;
  compact?: boolean;
}

export const TaxNotice: React.FC<TaxNoticeProps> = ({
  taxNotice = 'All prices are subject to 18% GST.',
  gstPercentage = 18,
  compact = false
}) => {
  if (compact) {
    return (
      <div className="flex items-center justify-center gap-1.5 py-1.5 px-3 bg-[#FAF6EE] border-y border-[#C5A059]/30 text-xs text-[#9A7730]">
        <Info className="w-3.5 h-3.5 shrink-0 text-[#C5A059]" />
        <span className="font-medium tracking-wide">{taxNotice}</span>
      </div>
    );
  }

  return (
    <div className="w-full my-6 p-4 rounded-xl bg-gradient-to-r from-[#FAF6EE] via-white to-[#FAF6EE] border border-[#C5A059]/40 shadow-xs">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-[#1E2022]">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-[#0B192C] flex items-center justify-center text-[#C5A059] shrink-0">
            <Receipt className="w-4 h-4" />
          </div>
          <div>
            <p className="font-semibold text-[#0B192C] text-sm">
              Government Tax Notice: {taxNotice}
            </p>
            <p className="text-[#6B7280] text-[11px]">
              Listed menu prices are exclusive of statutory taxes ({gstPercentage}% GST will be computed on your dining bill / room folio).
            </p>
          </div>
        </div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C5A059]/15 text-[#9A7730] font-semibold text-[11px] self-end sm:self-auto border border-[#C5A059]/30">
          <span>HSN/SAC 9963 • Hotel Atithi F&B</span>
        </div>
      </div>
    </div>
  );
};
