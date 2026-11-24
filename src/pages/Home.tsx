import {useLoaderData} from "react-router";
import {ClassLesson} from "../services/mockApi";
import {ROUTES} from "../constants/routes.ts";
import ClassCard from "../components/ClassCard.tsx";
import {BRAND} from "../constants/brand.ts";
import {Activity, Dumbbell, Flame, Instagram, Mail, MapPin, Phone, Sparkles, Waves} from "lucide-react";

export function Home() {
  const {lessons} = useLoaderData() as { lessons: ClassLesson[] };
  const available = lessons.filter(lesson => lesson.status === "scheduled");

  return (
      <div className="aerial-page">
        <section className="aerial-hero">
          <div className="aerial-bg" aria-hidden="true"/>
          <div className="aerial-overlay" aria-hidden="true"/>
          <div className="aerial-inner">
            <p className="aerial-domain">{BRAND.domain}</p>
            <h1>{BRAND.name}</h1>
            <p className="aerial-tagline">{BRAND.tagline}</p>
            <p className="aerial-intro">{BRAND.intro}</p>
            <div className="aerial-icons" role="list" aria-label="Contact links">
              <a href={`tel:${BRAND.contact.phone}`} aria-label="Call phone" role="listitem">
                <Phone size={18}/>
              </a>
              <a href={`mailto:${BRAND.contact.email}`} aria-label="Send email" role="listitem">
                <Mail size={18}/>
              </a>
              <a href={BRAND.contact.locationUrl} target="_blank" rel="noreferrer" aria-label="Open class location" role="listitem">
                <MapPin size={18}/>
              </a>
              <a href={BRAND.contact.instagramUrl} target="_blank" rel="noreferrer" aria-label="Open Instagram" role="listitem">
                <Instagram size={18}/>
              </a>
            </div>
          </div>
        </section>

        <article className="twenty-main">
          <header className="twenty-special">
            <div className="container">
              <span className="twenty-special-icon" aria-hidden="true"><Sparkles size={28}/></span>
              <h2>
                Professional training with <strong>{BRAND.founder}</strong>
                <br/>
                at Reformer Timisoara
              </h2>
              <p>
                This page presents Iulia as an independent trainer who teaches Yoga Pilates, Pilates Reformer,
                Body Sculpting, and mobility-focused sessions inside Reformer Timisoara.
              </p>
            </div>
          </header>

          <section className="twenty-wrapper twenty-style2">
            <div className="container twenty-split">
              <div>
                <h3>How classes are designed</h3>
                <p>
                  Classes are structured around safe progress, clear form cues, and balanced intensity.
                  Sessions can be adapted for beginners and intermediate students while keeping technique first.
                </p>
              </div>
              <ul className="twenty-featured-icons" aria-label="Training areas">
                <li><Waves size={28}/></li>
                <li><Activity size={28}/></li>
                <li><Dumbbell size={28}/></li>
                <li><Flame size={28}/></li>
              </ul>
            </div>
          </section>

          <section className="twenty-wrapper twenty-style1">
            <div className="container twenty-three-col">
              <section>
                <h3>Trainer-led sessions</h3>
                <p>Each class is personally guided by Iulia to keep quality, rhythm, and motivation consistent.</p>
              </section>
              <section>
                <h3>Multiple class formats</h3>
                <p>{BRAND.services.join(", ")}.</p>
              </section>
              <section>
                <h3>Registration now</h3>
                <p>Public booking will open later. For now, registration is handled directly through contact.</p>
              </section>
            </div>
          </section>

          <section className="twenty-wrapper twenty-style3">
            <div className="container">
              <header className="twenty-major">
                <h2>Class moments</h2>
              </header>
              <div className="twenty-gallery-grid">
                {BRAND.images.map((image, index) => (
                    <article key={image} className="twenty-gallery-item">
                      <img src={image} alt={`${BRAND.name} gallery ${index + 1}`}/>
                    </article>
                ))}
              </div>
            </div>
          </section>

          <section id="classes" className="twenty-wrapper twenty-style4">
            <div className="container">
              <header className="twenty-major">
                <h2>Upcoming classes</h2>
                <p>Open any class to view details. Booking is currently managed by admin.</p>
              </header>
              {available.length === 0 ? (
                  <p className="text-muted-foreground italic">No classes are available right now.</p>
              ) : (
                  <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {available.map(lesson => <ClassCard key={lesson.id} lesson={lesson} to={ROUTES.PUBLIC_CLASS}/>) }
                  </div>
              )}
            </div>
          </section>

          <section className="twenty-cta">
            <div className="container">
              <h2>Contact Iulia</h2>
              <p>Use direct channels for registration and schedule questions.</p>
              <div className="twenty-cta-contacts" role="list" aria-label="Contact methods">
                <a href={`tel:${BRAND.contact.phone}`} className="twenty-cta-contact" role="listitem" aria-label="Call Iulia">
                  <span className="twenty-cta-contact-icon"><Phone size={18}/></span>
                  <span className="twenty-cta-contact-text">
                    <strong>Phone</strong>
                    <span>{BRAND.contact.phone}</span>
                  </span>
                </a>
                <a href={`mailto:${BRAND.contact.email}`} className="twenty-cta-contact" role="listitem" aria-label="Send email to Iulia">
                  <span className="twenty-cta-contact-icon"><Mail size={18}/></span>
                  <span className="twenty-cta-contact-text">
                    <strong>Email</strong>
                    <span>{BRAND.contact.email}</span>
                  </span>
                </a>
                <a href={BRAND.contact.instagramUrl} target="_blank" rel="noreferrer" className="twenty-cta-contact" role="listitem" aria-label="Open Instagram profile">
                  <span className="twenty-cta-contact-icon"><Instagram size={18}/></span>
                  <span className="twenty-cta-contact-text">
                    <strong>Instagram</strong>
                    <span>{BRAND.contact.instagramHandle}</span>
                  </span>
                </a>
                <a href={BRAND.contact.locationUrl} target="_blank" rel="noreferrer" className="twenty-cta-contact" role="listitem" aria-label="Open class location">
                  <span className="twenty-cta-contact-icon"><MapPin size={18}/></span>
                  <span className="twenty-cta-contact-text">
                    <strong>Location</strong>
                    <span>{BRAND.contact.location}</span>
                  </span>
                </a>
              </div>
            </div>
          </section>
        </article>
      </div>
  );
}
