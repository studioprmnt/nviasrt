import Logo from '@/components/Logo';

/** Login / create-first-user screen: the nviasrt logo in ink, as in the site header. */
export function AdminLogo() {
  return (
    <div className="nv-admin-logo">
      <Logo title="nviasrt" />
      <span className="nv-admin-logo__sub">Studio</span>
    </div>
  );
}

/** Small mark in the nav and breadcrumb bar: the site's app-icon tile. */
export function AdminIcon() {
  // eslint-disable-next-line @next/next/no-img-element
  return <img className="nv-admin-icon" src="/brand/icon.svg" alt="nviasrt" width={22} height={22} />;
}
