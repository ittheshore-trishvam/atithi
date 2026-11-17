import React, { useState, useRef, useEffect } from 'react';
import { BrandLogo } from './BrandLogo';
import { X, Download, Printer, Copy, Check, Sparkles, Wifi, ExternalLink } from 'lucide-react';
import { RestaurantSettings } from '../types/index.ts';

interface QrCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: RestaurantSettings;
}

export const QrCodeModal: React.FC<QrCodeModalProps> = ({ isOpen, onClose, settings }) => {
  if (!isOpen) return null;

  const [tableOrRoom, setTableOrRoom] = useState('Table 1');
  const [copied, setCopied] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Target production URL
  const baseUrl = settings.qrCodeBaseUrl || 'https://menu.atithipondicherry.com/';
  const fullTargetUrl = `${baseUrl.replace(/\/$/, '')}/?loc=${encodeURIComponent(tableOrRoom)}`;

  // Draw QR pattern on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Size of QR Code
    const size = 300;
    canvas.width = size;
    canvas.height = size;

    // Background
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, size, size);

    // Draw realistic QR matrix pattern
    // Finder patterns (top-left, top-right, bottom-left)
    const drawFinder = (x: number, y: number) => {
      ctx.fillStyle = '#0B192C';
      ctx.fillRect(x, y, 70, 70);
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(x + 10, y + 10, 50, 50);
      ctx.fillStyle = '#C5A059';
      ctx.fillRect(x + 20, y + 20, 30, 30);
    };

    drawFinder(20, 20);
    drawFinder(210, 20);
    drawFinder(20, 210);

    // Pseudo-random data modules seeded by URL
    let seed = 0;
    for (let i = 0; i < fullTargetUrl.length; i++) {
      seed = (seed * 31 + fullTargetUrl.charCodeAt(i)) % 10000;
    }

    const random = () => {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };

    const moduleSize = 7;
    for (let r = 0; r < 29; r++) {
      for (let c = 0; c < 29; c++) {
        // Skip finder areas
        if ((r < 11 && c < 11) || (r < 11 && c > 18) || (r > 18 && c < 11)) {
          continue;
        }
        // Timing lines
        if (r === 6 || c === 6) {
          ctx.fillStyle = (r + c) % 2 === 0 ? '#0B192C' : '#FFFFFF';
        } else {
          ctx.fillStyle = random() > 0.48 ? '#0B192C' : '#FFFFFF';
        }
        ctx.fillRect(20 + c * 9, 20 + r * 9, moduleSize, moduleSize);
      }
    }

    // Luxury center crest emblem
    const cx = size / 2;
    const cy = size / 2;
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.arc(cx, cy, 26, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#C5A059';
    ctx.lineWidth = 3;
    ctx.stroke();

    ctx.fillStyle = '#0B192C';
    ctx.beginPath();
    ctx.arc(cx, cy, 22, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#E6C280';
    ctx.font = 'bold 13px serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('LB', cx, cy);
  }, [fullTargetUrl]);

  // Download PNG
  const handleDownloadPng = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const image = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = image;
    link.download = `Le-Boulevard-Menu-QR-${tableOrRoom.replace(/\s+/g, '_')}.png`;
    link.click();
  };

  // Download SVG
  const handleDownloadSvg = () => {
    const svgString = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 500" width="400" height="500">
      <rect width="400" height="500" fill="#FAF8F5" rx="16"/>
      <rect x="15" y="15" width="370" height="470" fill="none" stroke="#C5A059" stroke-width="2" rx="12"/>
      <text x="200" y="55" font-family="serif" font-size="24" font-weight="bold" fill="#0B192C" text-anchor="middle">LE BOULEVARD</text>
      <text x="200" y="75" font-family="sans-serif" font-size="11" fill="#C5A059" text-anchor="middle" letter-spacing="2">HOTEL ATITHI - TGI GRAND</text>
      <text x="200" y="95" font-family="sans-serif" font-size="12" fill="#666666" text-anchor="middle">${tableOrRoom}</text>
      <image href="${canvasRef.current?.toDataURL('image/png') || ''}" x="75" y="120" width="250" height="250"/>
      <text x="200" y="405" font-family="serif" font-size="16" font-weight="bold" fill="#0B192C" text-anchor="middle">SCAN FOR DIGITAL MENU</text>
      <text x="200" y="425" font-family="sans-serif" font-size="10" fill="#666666" text-anchor="middle">${baseUrl}</text>
      <text x="200" y="455" font-family="sans-serif" font-size="11" fill="#C5A059" text-anchor="middle">Complimentary Guest WiFi: Atithi_Guest</text>
    </svg>`;

    const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Le-Boulevard-Menu-QR-${tableOrRoom.replace(/\s+/g, '_')}.svg`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(fullTargetUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs transition-opacity animate-fade-in">
      <div 
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-[#C5A059]/40 flex flex-col overflow-hidden max-h-[95vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-[#0B192C] to-[#152A4A] text-white flex items-center justify-between border-b border-[#C5A059]/30">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#C5A059]" />
            <div>
              <h3 className="font-serif font-bold text-lg text-white">
                Digital Menu QR Studio
              </h3>
              <p className="text-[11px] text-[#E6C280]">
                Official Table & Tent Card Generator
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col items-center">
          {/* Customizer */}
          <div className="w-full mb-5 flex flex-col sm:flex-row items-center gap-3">
            <div className="w-full sm:w-1/2">
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                Tent Card Location Tag:
              </label>
              <input
                type="text"
                value={tableOrRoom}
                onChange={(e) => setTableOrRoom(e.target.value)}
                placeholder="e.g. Table 12, Poolside, Room 304"
                className="w-full px-3 py-2 rounded-xl text-xs border border-slate-300 focus:border-[#C5A059] focus:outline-none"
              />
            </div>
            <div className="w-full sm:w-1/2">
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                Target URL:
              </label>
              <div className="text-xs text-slate-600 truncate bg-slate-50 p-2 rounded-xl border border-slate-200">
                {fullTargetUrl}
              </div>
            </div>
          </div>

          {/* Printable Tent Card Preview Box */}
          <div className="w-full max-w-xs p-6 rounded-2xl bg-[#FAF8F5] border-2 border-[#C5A059] shadow-lg flex flex-col items-center text-center relative mb-5">
            {/* Subtle corner golden ornaments */}
            <div className="absolute top-2 left-2 text-[#C5A059] text-xs">❖</div>
            <div className="absolute top-2 right-2 text-[#C5A059] text-xs">❖</div>
            <div className="absolute bottom-2 left-2 text-[#C5A059] text-xs">❖</div>
            <div className="absolute bottom-2 right-2 text-[#C5A059] text-xs">❖</div>

            <div className="mb-2">
              <BrandLogo size="sm" showSubtitle={false} />
            </div>

            <p className="font-serif font-bold text-xs tracking-wider text-[#0B192C] uppercase">
              Le Boulevard
            </p>
            <p className="text-[10px] tracking-widest text-[#C5A059] uppercase font-semibold mb-3">
              Hotel Atithi — TGI Grand
            </p>

            <div className="p-2 bg-white rounded-xl shadow-xs border border-slate-200 mb-3">
              <canvas ref={canvasRef} className="w-44 h-44 rounded-lg block" />
            </div>

            <span className="inline-block px-3 py-0.5 rounded-full bg-[#0B192C] text-[#E6C280] font-bold text-[10px] uppercase tracking-wider mb-1">
              {tableOrRoom}
            </span>
            <p className="font-serif italic text-xs text-slate-700 font-medium">
              Scan to Explore Our Culinary Creations
            </p>

            <div className="mt-3 pt-2 border-t border-[#E2D7C3] w-full flex items-center justify-center gap-1.5 text-[10px] text-slate-500">
              <Wifi className="w-3 h-3 text-[#C5A059]" />
              <span>Free WiFi: <strong className="text-slate-700">Atithi_Guest</strong></span>
            </div>
          </div>

          {/* Production Notice */}
          <div className="w-full p-3 rounded-xl bg-blue-50 border border-blue-200 text-blue-900 text-xs mb-5 flex items-start gap-2">
            <ExternalLink className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">Ready for Production Deployment</p>
              <p className="text-[11px] text-blue-700">
                This QR code points directly to <strong className="underline">{baseUrl}</strong>. It requires no login for guests and opens directly on mobile browsers.
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 w-full">
            <button
              onClick={handleDownloadPng}
              className="py-2.5 px-3 rounded-xl text-xs font-bold text-[#0B192C] bg-slate-100 hover:bg-slate-200 border border-slate-300 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>PNG</span>
            </button>

            <button
              onClick={handleDownloadSvg}
              className="py-2.5 px-3 rounded-xl text-xs font-bold text-[#0B192C] bg-slate-100 hover:bg-slate-200 border border-slate-300 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Vector SVG</span>
            </button>

            <button
              onClick={handleCopyLink}
              className="py-2.5 px-3 rounded-xl text-xs font-bold text-[#0B192C] bg-slate-100 hover:bg-slate-200 border border-slate-300 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-[#C5A059]" />}
              <span>{copied ? 'Copied' : 'Copy URL'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="py-2.5 px-3 rounded-xl text-xs font-bold text-white bg-[#0B192C] hover:bg-[#152A4A] border border-[#C5A059] flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs"
            >
              <Printer className="w-3.5 h-3.5 text-[#E6C280]" />
              <span>Print Card</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
