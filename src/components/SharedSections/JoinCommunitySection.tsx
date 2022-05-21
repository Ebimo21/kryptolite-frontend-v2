import React from "react";
import SocialList from "../Layouts/Footer/SocialList";
import Section from "../Layouts/Section";
import highlighText from "../Tools/highlightText";

export default function JoinCommunitySection() {
  return (
    <Section className="space-y-10 md:text-center" padding={true}>
      <h2 className="md:text-center">Join {highlighText("Our Community")}</h2>
      <p>
        We are a new project but positive news about us is travelling fast. Be
        sure to join our amazing community to keep up-to-date and find out how
        you can get involved.
      </p>
      <SocialList />
    </Section>
  );
}
