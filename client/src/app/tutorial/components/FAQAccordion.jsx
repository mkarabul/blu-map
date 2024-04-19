import React from "react";

export default function FAQAccordion() {
  return (
    <div
      className="join join-vertical w-full"
      style={{ width: "70%", margin: "0 auto" }}
    >
      <div className="collapse collapse-arrow join-item border border-base-300">
        <input type="radio" name="my-accordion" />
        <div className="collapse-title text-xl font-medium">
          How can I contribute to the BluMap community?
        </div>
        <div className="collapse-content">
          <p>
            You can contribute to the BluMap community by sharing your travel
            itineraries, leaving reviews and ratings for activities, engaging in
            discussions, and providing feedback on other users' plans. Your
            active participation enriches the community and helps fellow
            travelers plan their trips more effectively.
          </p>
        </div>
      </div>
      <div className="collapse collapse-arrow join-item border border-base-300">
        <input type="radio" name="my-accordion" />
        <div className="collapse-title text-xl font-medium">
          Is my personal information secure on BluMap?
        </div>
        <div className="collapse-content">
          <p>
            Yes, we take the security of your personal information seriously.
            BluMap utilizes robust authentication methods and secure data
            storage practices to protect your data. Additionally, you have the
            option to keep your itineraries private, ensuring confidentiality
            until you choose to share them.{" "}
          </p>
        </div>
      </div>
      <div className="collapse collapse-arrow join-item border border-base-300">
        <input type="radio" name="my-accordion" />
        <div className="collapse-title text-xl font-medium">
          How does BluMap ensure the authenticity of user-generated content?
        </div>
        <div className="collapse-content">
          <p>
            BluMap implements strict measures to maintain the authenticity and
            integrity of user-generated content. We verify user identities,
            especially for significant contributors to the community, to ensure
            the credibility of reviews and recommendations. Furthermore, our
            platform features a reporting system where users can flag content or
            report issues, enabling swift moderation of inappropriate or
            offensive content.
          </p>
        </div>
      </div>
      <div className="collapse collapse-arrow join-item border border-base-300">
        <input type="radio" name="my-accordion" />
        <div className="collapse-title text-xl font-medium">
          How can I report inappropriate content or behavior on BluMap?
        </div>
        <div className="collapse-content">
          <p>
            If you encounter any content or behavior that violates our community
            guidelines or terms of service, you can easily report it to our
            moderation team. BluMap features a reporting system where users can
            flag content or report issues, enabling us to promptly investigate
            and take appropriate action to maintain a safe and positive
            environment for all users.
          </p>
        </div>
      </div>
      <div className="collapse collapse-arrow join-item border border-base-300">
        <input type="radio" name="my-accordion" />
        <div className="collapse-title text-xl font-medium">
          How does BluMap differentiate itself from existing travel planning
          platforms like TripAdvisor and Expedia?
        </div>
        <div className="collapse-content">
          <p>
            BluMap distinguishes itself by offering detailed, hour-by-hour
            itinerary customization and a strong community-led system for trip
            sharing and collaboration, features that are often lacking in
            current platforms. While platforms like TripAdvisor focus on reviews
            and Expedia on bookings, BluMap combines comprehensive trip planning
            with social interaction, providing users with a more engaging and
            personalized experience.
          </p>
        </div>
      </div>
      <div className="collapse collapse-arrow join-item border border-base-300">
        <input type="radio" name="my-accordion" />
        <div className="collapse-title text-xl font-medium">
          How does BluMap leverage user feedback and engagement to improve the
          platform?
        </div>
        <div className="collapse-content">
          <p>
            BluMap fosters user engagement through features like
            community-driven trip sharing, communication channels, and a
            reputation system. User feedback, including reviews, ratings, and
            comments, is actively monitored and utilized to make continuous
            improvements to the platform, ensuring that it remains responsive to
            user needs and preferences.
          </p>
        </div>
      </div>
      <div className="collapse collapse-arrow join-item border border-base-300">
        <input type="radio" name="my-accordion" />
        <div className="collapse-title text-xl font-medium">
          What deployment strategy is employed to make BluMap accessible to
          users?
        </div>
        <div className="collapse-content">
          <p>
            BluMap is strategically deployed on AWS using Kubernetes DevOps to
            ensure optimal accessibility and resource management. This
            deployment strategy enables the platform to scale effectively,
            accommodate growing user demand, and maintain constant uptime,
            thereby enhancing the reliability and reach of BluMap for users
            worldwide.
          </p>
        </div>
      </div>
    </div>
  );
}
