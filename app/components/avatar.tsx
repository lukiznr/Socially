import { UserIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import { useState } from "react";
const AvatarWithFallback = ({
  src,
  alt,
  fallbackText,
  className,
}: {
  src: string;
  alt: string;
  fallbackText: string;
  className: string;
}) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [imgError, setImgError] = useState(false);

  const handleError = () => {
    setImgSrc("");
    setImgError(true);
  };

  return (
    <div className="avatar-container">
      {imgError ? (
        <span className={className}>{fallbackText}</span>
      ) : (
        <img
          src={imgSrc}
          alt={alt}
          onError={handleError}
          className={className}
        />
      )}
    </div>
  );
};

function ambilInisial(nama: string): string {
  const kata = nama.split(" ");
  let inisial = "";

  for (const kataSatu of kata) {
    inisial += kataSatu.slice(0, 2).toUpperCase();
  }

  return inisial;
}

export default function Avatar({
  src,
  name,
  size,
}: {
  src?: string | null;
  name: string;
  size: "sm" | "md" | "lg";
}) {
  const avatarLg = "w-24 h-24 mx-auto mb-4 border-2 border-primary-500";
  const avatarMd = "h-11 w-11";
  const avatarSm = "w-6 h-6";
  const className =
    size === "sm" ? avatarSm : size === "md" ? avatarMd : avatarLg;
  const fallback = ambilInisial(name);
  return (
    <div>
      {src ? (
        <AvatarWithFallback
          src={src}
          alt={name}
          fallbackText={fallback}
          className={clsx(className, "rounded-full object-cover")}
        />
      ) : (
        <UserIcon className={className} />
      )}
    </div>
  );
}
