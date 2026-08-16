export const dynamic = 'force-dynamic';
export const revalidate = 0;

import App from '../../App';
import { getSanityData } from '../../lib/sanityFetch';

export default async function WorksRoute() {
  const sanityData = await getSanityData();

  if (!sanityData || !sanityData.works) {
    return (
      <div style={{
        padding: '80px 24px',
        textAlign: 'center',
        color: '#d9534f',
        backgroundColor: '#f9f9f9',
        border: '1px solid #d9534f',
        borderRadius: '6px',
        maxWidth: '800px',
        margin: '60px auto',
        fontFamily: 'monospace',
        boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
      }}>
        <h1 style={{ fontSize: '1.8rem', marginBottom: '16px' }}>LỖI FETCH SANITY</h1>
        <p style={{ fontSize: '1rem', color: '#333', lineHeight: 1.6 }}>
          Không thể kết nối hoặc không tìm thấy dữ liệu trang dự án (`site.works`) trong Sanity Studio.
        </p>
        <div style={{ marginTop: '24px', textAlign: 'left', backgroundColor: '#eaeaea', padding: '16px', borderRadius: '4px', overflowX: 'auto' }}>
          <strong>Dữ liệu trả về từ Sanity:</strong>
          <pre style={{ fontSize: '0.82rem', marginTop: '8px', color: '#555' }}>
            {JSON.stringify(sanityData, null, 2)}
          </pre>
        </div>
      </div>
    );
  }

  return (
    <App sanityData={sanityData} initialPage="showcase" />
  );
}
