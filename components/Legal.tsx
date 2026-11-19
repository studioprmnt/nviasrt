export default function Legal({ title, updated, sections }: { title: string; updated: string; sections: [string, string][] }) {
  return (
    <section className="wrap" style={{ paddingBlock: '72px 160px' }}>
      <div className="prose" style={{ marginInline: 'auto' }}>
        <p className="label taupe">Legal</p>
        <h1 className="display-l" style={{ marginTop: 12 }}>{title}</h1>
        <p className="body-m taupe" style={{ marginTop: 12 }}>Last updated {updated}</p>
        <hr style={{ border: 0, borderTop: '1px solid var(--sand)', margin: '32px 0' }} />
        {sections.map(([h, b]) => <div key={h} style={{ marginTop: 32 }}><h2 className="h3">{h}</h2><p className="body-l" style={{ marginTop: 12 }}>{b}</p></div>)}
      </div>
    </section>
  );
}
