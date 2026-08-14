import OptimizedImage from './OptimizedImage';

export default function HomeServiceRow({ service, index, onNavigate }) {
  const details = service.details || [];

  return (
    <article className="home-service-panel" id={`home-${service.id || index}`}>
      <div className="home-service-panel-bg" aria-hidden="true">
        <OptimizedImage
          src={service.img}
          alt=""
          maxWidth={1200}
          sizes="100vw"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>
      <span className="home-service-panel-index">{String(index).padStart(2, '0')}</span>
      <div className="home-service-geometry home-service-geometry--one" aria-hidden="true" />
      <div className="home-service-geometry home-service-geometry--two" aria-hidden="true" />

      <div className="home-service-panel-inner">
        <div className="home-service-panel-title-wrap">
          <h4 className="home-service-panel-title">{service.name}</h4>
        </div>

        <div className="home-service-panel-copy">
          <div className="home-service-panel-intro">
            <span className="home-service-panel-copy-index">{String(index).padStart(2, '0')}</span>
            <p>{service.desc}</p>
          </div>
          <div className="home-service-panel-scope">
            <span className="home-service-panel-scope-label">Scope of Work</span>
            {details.length > 0 && (
              <ul>
                {details.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}
          </div>
          <button
            type="button"
            className="home-service-panel-cta"
            onClick={() => onNavigate(service)}
            aria-label={`View ${service.name} details`}
          >
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>
    </article>
  );
}
