import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const styles = {
  container: {
    backgroundColor: "black",
    color: "white",
    padding: "32px",
    fontFamily: "Arial, sans-serif",
  },
  innerContainer: {
    maxWidth: "1200px",
    margin: "0 auto",
  },
  headerSection: {
    marginBottom: "40px",
  },
  title: {
    fontSize: "28px",
    fontWeight: "bold",
    marginBottom: "8px",
  },
  subtitle: {
    color: "#9ca3af",
    fontSize: "16px",
  },
  tabsContainer: {
    display: "flex",
    marginBottom: "32px",
    backgroundColor: "#111827",
    borderRadius: "9999px",
    padding: "4px",
  },
  tab: {
    padding: "8px 16px",
    borderRadius: "9999px",
    marginRight: "8px",
    cursor: "pointer",
    background: "transparent",
    color: "#9ca3af",
    border: "none",
    transition: "all 0.3s ease",
  },
  activeTab: {
    background: "radial-gradient(circle at center, #ffffff 0%, #4b5563 100%)",
    color: "black",
    fontWeight: "bold",
    boxShadow: "none",
  },
  tabHover: {
    color: "#ffffff",
    boxShadow: "0 0 8px rgba(255, 255, 255, 0.3)",
  },
  cardsContainer: {
    display: "flex",
    gap: "16px",
    overflow: "hidden",
  },
  card: {
    flex: "1",
    borderRadius: "12px",
    overflow: "hidden",
    minWidth: "300px",
    maxWidth: "32%",
    transition: "all 0.3s ease",
    cursor: "pointer",
    minHeight: "300px",
    display: "flex",
    flexDirection: "column",
  },
  cardHover: {
    filter: "brightness(0.85)",
  },
  cardContent: {
    padding: "24px",
    flexGrow: "1",
    overflow: "auto",
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "16px",
  },
  iconTitleWrapper: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  iconContainer: {
    width: "32px",
    height: "32px",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "18px",
    backgroundColor: "#374151",
    color: "white",
  },
  cardTitle: {
    fontWeight: "500",
    fontSize: "16px",
  },
  arrowButton: {
    borderRadius: "50%",
    backgroundColor: "rgba(31, 41, 55, 0.5)",
    width: "32px",
    height: "32px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    border: "none",
  },
  cardDescription: {
    fontSize: "14px",
    color: "#d1d5db",
    marginBottom: "16px",
  },
  carouselFooter: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "32px",
  },
  browseText: {
    color: "#6b7280",
  },
  navigationButtons: {
    display: "flex",
    gap: "8px",
  },
  navButton: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    border: "1px solid #4b5563",
    backgroundColor: "transparent",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
  },
};

function Card({ card }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      style={{
        ...styles.card,
        background: card.gradient,
        ...(isHovered ? styles.cardHover : {}),
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={styles.cardContent}>
        <div style={styles.cardHeader}>
          <div style={styles.iconTitleWrapper}>
            <div style={styles.iconContainer}>{card.icon}</div>
            <span style={styles.cardTitle}>{card.title}</span>
          </div>
          <button style={styles.arrowButton}>
            <ChevronRight size={16} />
          </button>
        </div>
        <p style={styles.cardDescription}>{card.description}</p>
      </div>
    </div>
  );
}

export default function About() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [activeTab, setActiveTab] = useState("Facts");

  const cardsByTab = {
    Facts: [
      {
        id: 1,
        title: "Food Waste",
        description: "Roughly 1/3 of the food produced globally is wasted each year.",
        icon: "🌍",
        gradient: "linear-gradient(135deg, #3b2f80, #1e1a4c)",
      },
      {
        id: 2,
        title: "Environmental Burden",
        description: "Food waste contributes to about 8–10% of global greenhouse gas emissions.",
        icon: "♻️",
        gradient: "linear-gradient(135deg, #2f5da0, #0f2a4a)",
      },
      {
        id: 3,
        title: "Bio-Product Use",
        description: "Food waste can be transformed into valuable materials like biofibre and paper.",
        icon: "🧪",
        gradient: "linear-gradient(135deg, #1ed760, #0a2c1a)",
      },
    ],
    Statistics: [
      {
        id: 4,
        title: "Global Impact",
        description: "1.3 billion tons of food are wasted annually worldwide.",
        icon: "📊",
        gradient: "linear-gradient(135deg, #6f42c1, #240046)",
      },
      {
        id: 5,
        title: "India's Waste",
        description: "India wastes 68.8 million tons of food per year.",
        icon: "🇮🇳",
        gradient: "linear-gradient(135deg, #ff6c37, #441800)",
      },
      {
        id: 6,
        title: "Economic Loss",
        description: "$1 trillion is lost globally due to food waste.",
        icon: "💸",
        gradient: "linear-gradient(135deg, #0db7ed, #005f73)",
      },
    ],
    Causes: [
      {
        id: 7,
        title: "Overproduction",
        description: "Excess production in agriculture and manufacturing leads to waste.",
        icon: "🌾",
        gradient: "linear-gradient(135deg, #a259ff, #240046)",
      },
      {
        id: 8,
        title: "Poor Storage",
        description: "Lack of infrastructure results in spoilage before use.",
        icon: "🏚️",
        gradient: "linear-gradient(135deg, #00c9a7, #004643)",
      },
      {
        id: 9,
        title: "Consumer Behavior",
        description: "Over-purchasing and poor planning waste edible food.",
        icon: "🛒",
        gradient: "linear-gradient(135deg, #57cc99, #22577a)",
      },
    ],
    Impact: [
      {
        id: 10,
        title: "Climate Change",
        description: "Food waste decomposing in landfills emits methane, a potent GHG.",
        icon: "🌡️",
        gradient: "linear-gradient(135deg, #28a745, #14532d)",
      },
      {
        id: 11,
        title: "Resource Waste",
        description: "Water, energy, and land are wasted in food that is never eaten.",
        icon: "💧",
        gradient: "linear-gradient(135deg, #2d2d2d, #111111)",
      },
      {
        id: 12,
        title: "Biodiversity Loss",
        description: "Conversion of land for excess food production threatens wildlife.",
        icon: "🦋",
        gradient: "linear-gradient(135deg, #fcd34d, #92400e)",
      },
    ],
  };

  const cards = cardsByTab[activeTab];
  const totalSlides = Math.ceil(cards.length / 3);
  const visibleCards = cards.slice(activeSlide * 3, activeSlide * 3 + 3);

  const nextSlide = () => setActiveSlide((prev) => (prev + 1) % totalSlides);
  const prevSlide = () => setActiveSlide((prev) => (prev - 1 + totalSlides) % totalSlides);

  const tabs = Object.keys(cardsByTab);

  return (
    <div style={styles.container}>
      <div style={styles.innerContainer}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px" }}>
          <div style={styles.headerSection}>
            <h1 style={styles.title}>Turn Waste into Worth.</h1>
            <p style={styles.subtitle}>Converting food waste to biofibre and paper.</p>
          </div>

          <div style={{ ...styles.tabsContainer, border: "2px solid white", borderRadius: "12px", padding: "8px" }}>
            {tabs.map((tab) => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  style={{ ...styles.tab, ...(isActive ? styles.activeTab : {}) }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.color = styles.tabHover.color;
                      e.currentTarget.style.boxShadow = styles.tabHover.boxShadow;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.color = styles.tab.color;
                      e.currentTarget.style.boxShadow = "none";
                    }
                  }}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              );
            })}
          </div>
        </div>

        <div style={styles.cardsContainer}>
          {visibleCards.map((card) => (
            <Card key={card.id} card={card} />
          ))}
        </div>

        <div style={styles.carouselFooter}>
          <p style={styles.browseText}>Explore more sustainable ideas →</p>
          <div style={styles.navigationButtons}>
            <button onClick={prevSlide} style={styles.navButton}>
              <ChevronLeft size={16} />
            </button>
            <button onClick={nextSlide} style={styles.navButton}>
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
