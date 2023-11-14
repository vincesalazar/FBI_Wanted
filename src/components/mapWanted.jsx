export default function MapWanted(props) {
  return (
    <div className="wantedContainer">
      {props.items.map((e, i) => (
        <div className="perContainer">
          <h4 key={i}>{e.title}</h4>
          <p>{String.raw`${e.description}`}</p>
          <small>{e.images[0].caption}</small>
          <div
            key={i + 1}
            className="wantedImg"
            style={{
              backgroundImage: `url(${e.images[0].thumb}`
            }}
          ></div>
          {e.images[1] && (
            <div>
              <small>{e.images[1].caption}</small>
              <div
                key={i + 2}
                className="wantedImg"
                style={{
                  backgroundImage: `url(${e.images[1].original}`
                }}
              ></div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
