"use client";

import Modal from "./modal";
import styles from "./howItWorksModal.module.css";

interface HowItWorksModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function HowItWorksModal({
  isOpen,
  onClose,
}: HowItWorksModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="How It Works">
      <div className={styles.content}>
        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>What is Choose Your Colors?</h3>
          <p className={styles.paragraph}>
            Choose Your Colors is a fun tool that helps you discover sports
            teams based on your favorite color combinations. Whether you&apos;re
            looking for a new team to support or just curious about which teams
            rock your favorite colors, we&apos;ve got you covered!
          </p>
        </section>

        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>How to Use It</h3>
          <ol className={styles.list}>
            <li>
              <strong>Pick Your Colors:</strong> Click on the two color pickers
              to select your primary and secondary colors. These could be your
              favorite colors, your company colors, or any combination you love!
            </li>
            <li>
              <strong>See Your Matches:</strong> We&apos;ll instantly show you
              sports teams that have similar color schemes, sorted by how
              closely they match your choices.
            </li>
            <li>
              <strong>Adjust Results:</strong> Use the slider at the bottom to
              see more or fewer teams (1-20 teams).
            </li>
            <li>
              <strong>Explore Teams:</strong> Click on any team to learn more
              about them!
            </li>
          </ol>
        </section>

        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>How Color Matching Works</h3>
          <p className={styles.paragraph}>
            We use the <strong>Delta E algorithm</strong>, a scientific method
            that measures how the human eye perceives color differences. This
            means we don&apos;t just compare RGB values - we find teams whose
            colors
            <em> look</em> similar to your choices, just like your eyes would
            see them!
          </p>
          <p className={styles.paragraph}>The algorithm considers:</p>
          <ul className={styles.list}>
            <li>Hue (the actual color)</li>
            <li>Saturation (how vivid the color is)</li>
            <li>Brightness (how light or dark it is)</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>Sports & Leagues Included</h3>
          <p className={styles.paragraph}>
            Our database includes teams from major sports leagues around the
            world:
          </p>
          <ul className={styles.list}>
            <li>⚽ Football teams</li>
            <li>🏀 NBA (Basketball)</li>
            <li>🏈 NFL (American Football)</li>
            <li>⚾ MLB (Baseball)</li>
            <li>🏒 NHL (Hockey)</li>
            <li>🏏 Cricket teams</li>
            <li>🏉 Rugby teams</li>
            <li>And many more!</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>Pro Tips</h3>
          <ul className={styles.list}>
            <li>
              <strong>Try complementary colors</strong> for interesting matches
              - teams often use colors that pop together!
            </li>
            <li>
              <strong>Use the action buttons</strong> between the color pickers:
              <ul style={{ marginTop: "0.5rem", marginBottom: 0 }}>
                <li>
                  <strong>Swap colors</strong> (↔️) - Switch your primary and
                  secondary colors instantly
                </li>
                <li>
                  <strong>Random team colors</strong> (🎯) - Pick colors from a
                  random existing team
                </li>
                <li>
                  <strong>Totally random colors</strong> (❓) - Generate
                  completely random color combinations
                </li>
                <li>
                  <strong>Reset colors</strong> (⊗) - Clear your selections and
                  start fresh
                </li>
              </ul>
            </li>
            <li>
              <strong>Share your results</strong> - the URL updates with your
              color choices, so you can share your findings.
            </li>
          </ul>
        </section>
      </div>
    </Modal>
  );
}
