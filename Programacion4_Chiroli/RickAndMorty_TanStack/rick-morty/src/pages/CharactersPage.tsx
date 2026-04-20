import { useQuery } from "@tanstack/react-query";
import { getCharacters } from "../api/characters.actions";

const statusStyles: Record<string, { badge: string; dot: string }> = {
  Alive:   { badge: "background:#0d3322; color:#45C496",  dot: "background:#45C496" },
  Dead:    { badge: "background:#2e1010; color:#E24B4A",  dot: "background:#E24B4A" },
  unknown: { badge: "background:#1e1e1e; color:#888780",  dot: "background:#888780" },
};

const CharactersPage = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["characters"],
    queryFn: getCharacters,
  });

  if (isLoading) return (
    <div style={styles.root}>
      <p style={{ color: "#66FCF1" }}>Cargando personajes...</p>
    </div>
  );

  if (isError) return (
    <div style={styles.root}>
      <p style={{ color: "#E24B4A" }}>Error al cargar los personajes.</p>
    </div>
  );

  return (
    <div style={styles.root}>
      <header style={{ marginBottom: "2rem"}}>
        <h1 style={styles.title}>RICK & MORTY</h1>
        <p style={styles.subtitle}>
          {data?.results.length} personajes encontrados
        </p>
      </header>

      <div style={styles.grid}>
        {data?.results.map((character) => {
          const s = statusStyles[character.status] ?? statusStyles["unknown"];
          return (
            <div key={character.id} style={styles.card}>
              <img
                src={character.image}
                alt={character.name}
                style={styles.img}
              />
              <div style={styles.cardBody}>
                <p style={styles.name}>{character.name}</p>
                <span style={{ ...styles.badge, ...parseStyle(s.badge) }}>
                  <span style={{ ...styles.dot, ...parseStyle(s.dot) }} />
                  {character.status}
                </span>
                <p style={styles.species}>{character.species}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const parseStyle = (str: string): React.CSSProperties =>
  Object.fromEntries(
    str.split(";").filter(Boolean).map((p) => {
      const [k, v] = p.split(":").map((s) => s.trim());
      const key = k.replace(/-([a-z])/g, (_, l) => l.toUpperCase());
      return [key, v];
    })
  );

const styles: Record<string, React.CSSProperties> = {
  root: {
    minHeight: "100vh",
    background: "#041720ff",
    padding: "2rem",
    textAlign: "center",
    fontFamily: "'Segoe UI', system-ui, sans-serif",
  },
  title: {
    fontSize: 50,
    fontWeight: 700,
    color: "#66FCF1",
    letterSpacing: "-0.5px",
    margin: "0 0 4px",
  },
  subtitle: {
    fontSize: 16,
    color: "#8B9BAA",
    margin: 0,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
    gap: 16,
  },
  card: {
    background: "#1F2833",
    borderRadius: 12,
    overflow: "hidden",
    border: "1px solid #1f3a3a",
  },
  img: {
    width: "100%",
    display: "block",
  },
  cardBody: {
    padding: "10px 12px 14px",
  },
  name: {
    fontSize: 13,
    fontWeight: 600,
    color: "#C5C6C7",
    margin: "0 0 6px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  badge: {
    display: "inline-flex",
    alignItems: "center",
    gap: 5,
    fontSize: 11,
    padding: "3px 8px",
    borderRadius: 20,
    fontWeight: 500,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: "50%",
    flexShrink: 0,
  },
  species: {
    fontSize: 11,
    color: "#8B9BAA",
    margin: "4px 0 0",
  },
};

export default CharactersPage;