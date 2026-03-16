import { useNavigate } from "react-router-dom";
import "../styles/categorySelect.css";

const categories = [
  { name: "Ragging / Bullying",   value: "Ragging/Bullying",    image: "/categories/ragging.jpeg",              color: "#f59e0b" },
  { name: "Theft",                value: "Theft",               image: "/categories/theft.jpeg",                color: "#6366f1" },
  { name: "Cyber Crime",          value: "Cyber Crime",         image: "/categories/cyber.jpeg",                color: "#0ea5e9" },
  { name: "Physical Assault",     value: "Physical Assault",    image: "/categories/physical assault.jpeg",     color: "#ef4444" },
  { name: "Stalking",             value: "Stalking",            image: "/categories/stalking.jpeg",             color: "#8b5cf6" },
  { name: "Sexual Harassment",    value: "Sexual Harassment",   image: "/categories/sexual harrasement.jpeg",   color: "#ec4899" },
  { name: "Drug Activities",      value: "Drug Activities",     image: "/categories/drug.jpeg",                 color: "#dc2626" },
  { name: "Missing Person",       value: "Missing Person",      image: "/categories/missing.jpeg",              color: "#64748b" },
  { name: "Fraud / Cheating",     value: "Fraud/Cheating",      image: "/categories/fraud.jpeg",                color: "#d97706" },
  { name: "Road Accident",        value: "Road Accident",       image: "/categories/road accident.jpeg",        color: "#0891b2" },
  { name: "Other",                value: "Other",               image: null,                                    color: "#10b981" },
];

function CategorySelect() {
  const navigate = useNavigate();

  return (
    <div className="cat-page">
      <div className="cat-hero">
        <h1 className="cat-hero-title">Report a Complaint</h1>
        <p className="cat-hero-sub">Select the category that best describes your complaint</p>
      </div>

      <div className="cat-body">
        <div className="cat-grid">
          {categories.map((cat, i) => (
            <div
              key={cat.value}
              className={`cat-card ${cat.value === "Other" ? "cat-card-other" : ""}`}
              style={{ animationDelay: `${i * 0.07}s` }}
              onClick={() => navigate(`/submit/${encodeURIComponent(cat.value)}`)}
            >
              {cat.image ? (
                <div className="cat-img-wrap">
                  <img src={cat.image} alt={cat.name} className="cat-img" />
                  <div className="cat-img-overlay" style={{ background: `${cat.color}22` }} />
                </div>
              ) : (
                <div className="cat-other-placeholder">
                  <span className="cat-other-icon">📝</span>
                  <p className="cat-other-text">Something not listed above?<br />Report it here.</p>
                </div>
              )}
              <div className="cat-card-footer" style={{ borderTop: `3px solid ${cat.color}` }}>
                <span className="cat-name">{cat.name}</span>
                <span className="cat-arrow" style={{ color: cat.color }}>→</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CategorySelect;