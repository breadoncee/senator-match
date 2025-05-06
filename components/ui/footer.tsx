import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="py-3 border-t border-gray-200 bg-primary/5">
      <div className="container mx-auto px-4 flex flex-col sm:flex-row justify-between items-center">
        <div className="flex items-center mb-2 sm:mb-0">
          <Image
            src="/datos-pilipinas-logo.svg"
            alt="Datos Pilipinas Logo"
            width={80}
            height={40}
            className="h-auto"
          />
        </div>
        <div className="text-xs text-gray-500">© 2025 All rights reserved</div>
      </div>
    </footer>
  );
}
