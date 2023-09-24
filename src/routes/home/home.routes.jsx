import { Link } from "react-router-dom";

const HomeRoute = () => {
  return (
    <>
      <header
        style={{
          backgroundColor: "#007BFF",
          color: "#fff",
          textAlign: "center",
          padding: "10px 0",
        }}
      >
        <h1 style={{ fontSize: "32px" }}>Welcome to Guntas Cardic Hospital</h1>
        <nav>
          <ul style={{ listStyle: "none" }}>
            <li style={{ display: "inline", marginRight: "20px" }}>
              <Link
                href="#"
                style={{
                  textDecoration: "none",
                  color: "#fff",
                  fontWeight: "bold",
                }}
              >
                Home
              </Link>
            </li>
            <li style={{ display: "inline", marginRight: "20px" }}>
              <Link
                to="/register"
                style={{
                  textDecoration: "none",
                  color: "#fff",
                  fontWeight: "bold",
                }}
              >
                Register as Patient
              </Link>
            </li>

            <li style={{ display: "inline", marginRight: "20px" }}>
              <Link
                to="/sign-in"
                style={{
                  textDecoration: "none",
                  color: "#fff",
                  fontWeight: "bold",
                }}
              >
                Dashboard
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      <section className="hero">
        <img
          src="data:image/jpeg;base64,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"
          alt="Hospital"
          style={{ width: "25%", height: "auto" }}
        />
      </section>

      <section className="about-us" style={{ padding: "40px" }}>
        <h2>About Us</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac
          justo Link odio congue efficitur. Suspendisse potenti.
        </p>
      </section>

      <section className="services" style={{ padding: "40px" }}>
        <h2>Our Services</h2>
        <ul>
          <li>Emergency Care</li>
          <li>General Surgery</li>
          <li>Internal Medicine</li>
          <li>Pediatrics</li>
          <li>...and more</li>
        </ul>
      </section>

      <section className="doctors" style={{ padding: "40px" }}>
        <h2>Our Doctors</h2>
        <div className="doctor">
          <img
            src="doctor1.jpg"
            alt="Doctor 1"
            style={{ width: "100px", height: "100px", borderRadius: "50%" }}
          />
          <h3>Dr. John Doe</h3>
          <p>Cardiologist</p>
        </div>
        <div className="doctor">
          <img
            src="doctor2.jpg"
            alt="Doctor 2"
            style={{ width: "100px", height: "100px", borderRadius: "50%" }}
          />
          <h3>Dr. Jane Smith</h3>
          <p>Pediatrician</p>
        </div>
      </section>

      <section className="contact" style={{ padding: "40px" }}>
        <h2>Contact Us</h2>
        <p>
          If you have any questions or need assistance, please feel free to
          contact us.
        </p>
        <Link
          href="contact.html"
          style={{
            textDecoration: "none",
            backgroundColor: "#007BFF",
            color: "#fff",
            padding: "10px 20px",
            borderRadius: "5px",
          }}
        >
          Contact Now
        </Link>
      </section>

      <footer
        style={{
          backgroundColor: "#333",
          color: "#fff",
          textAlign: "center",
          padding: "10px 0",
        }}
      >
        <p>&copy; 2023 Hospital Name. All rights reserved.</p>
      </footer>
    </>
  );
};

export default HomeRoute;
