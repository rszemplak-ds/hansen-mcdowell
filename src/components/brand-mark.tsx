import Image from "next/image";
import Link from "next/link";

export function BrandMark({ inverse = false }: { inverse?: boolean }) {
  return (
    <Link className={`brand ${inverse ? "brand--inverse" : ""}`} href="/">
      <span className="brand__mark" aria-hidden="true">
        <Image
          src="/images/viking-cat.jpg"
          alt=""
          width={48}
          height={48}
          priority
        />
      </span>
      <span className="brand__words">
        <strong>Hansen McDowell</strong>
        <span>Estate Sales</span>
      </span>
    </Link>
  );
}
