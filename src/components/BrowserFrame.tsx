import Image from 'next/image';

type Props = {
  src: string;
  alt: string;
  url?: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
};

export function BrowserFrame({ src, alt, url, className, priority, sizes }: Props) {
  return (
    <div className={`bframe ${className ?? ''}`}>
      <div className="bframe__bar" aria-hidden="true">
        <span className="bframe__dots">
          <i />
          <i />
          <i />
        </span>
        <span className="bframe__url">{url ?? 'genrecai.com'}</span>
        <span className="bframe__lock" />
      </div>
      <div className="bframe__screen">
        <Image
          src={src}
          alt={alt}
          width={1600}
          height={1000}
          priority={priority}
          sizes={sizes ?? '(max-width: 900px) 100vw, 60vw'}
        />
      </div>
    </div>
  );
}

export function PhoneFrame({ src, alt, className }: { src: string; alt: string; className?: string }) {
  return (
    <div className={`pframe ${className ?? ''}`}>
      <span className="pframe__notch" aria-hidden="true" />
      <div className="pframe__screen">
        <Image src={src} alt={alt} width={430} height={932} sizes="(max-width: 900px) 70vw, 22vw" />
      </div>
    </div>
  );
}
