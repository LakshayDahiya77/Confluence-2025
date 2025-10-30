/**
 * Gallery data configuration
 * Centralized gallery images and content for easy management
 */

export type GalleryItem = {
  title: string;
  content: string;
  image: string;
  day: string;
  vector: string;
};

export const galleryData: GalleryItem[] = [
  {
    title: "Kavyanjali",
    content:
      "काव्यांजलि (एक शाम प्रेम, हास्य और ग़ज़लों के नाम), एक ऐसी शाम जहाँ हर एहसास लफ़्ज़ों में बयाँ होता है, जहाँ हर जुबां पर सिर्फ़ वाह होता है। यहाँ शिरकत करने आते हैं देश के विख्यात कवि/कवयित्री और उनको सुनने के लिए मौजूद होती है, उत्साह और जोश से भरी हज़ारों की भीड़।",
    image: "/Gallery Images/DSC_5408.jpg",
    day: "day 1",
    vector:
      "https://res.cloudinary.com/dyqkhzgv6/image/upload/v1761718218/4792328_2472781_qnywmc.jpg",
  },
  {
    title: "Libaas",
    content:
      "Step into the world of fashion at Confluence's Libaas! Models will grace the runway, showcasing a blend of creative costumes and stylish outfits in a mesmerizing fashion show.",
    image: "/Gallery Images/DSC_5824.jpg",
    day: "day 1",
    vector:
      "https://res.cloudinary.com/dyqkhzgv6/image/upload/v1761718217/14571759_5490039_w44plo.jpg",
  },
  {
    title: "Groove Armada",
    content:
      "Feel the beat at Confluence's Groove Armada! Dancers will light up the stage with a fusion of styles, from hip-hop to contemporary, battling it out for the ultimate dance crown.",
    image:
      "https://res.cloudinary.com/dyqkhzgv6/image/upload/v1761594914/D7500-37_l2clm7.jpg",
    day: "day 2",
    vector:
      "https://res.cloudinary.com/dyqkhzgv6/image/upload/v1761718218/4792328_2472781_qnywmc.jpg",
  },
  {
    title: "Folk Dance",
    content:
      "The Folk Dance event celebrates the vibrant traditions and cultural diversity of India. Students showcase various regional dance forms like Bhangra, Garba, and Ghoomar, with colorful costumes and energetic performances.",
    image: "/Gallery Images/DSC_2596.jpg",
    day: "day 2",
    vector:
      "https://res.cloudinary.com/dyqkhzgv6/image/upload/v1761718226/36102445_2211.w026.n002.2792B.p1.2792_zlvdws.jpg",
  },
  {
    title: "BATTLE OF BANDS",
    content:
      "Bands deliver originals and inspired covers, each riff alive with intent, every beat commanding the crowd. Judged on originality, synchronization, composition, and stage presence, this is an electrifying face‑off of talent and teamwork.",
    image: "/Gallery Images/DSC_1099.jpg",
    day: "day 3",
    vector:
      "https://res.cloudinary.com/dyqkhzgv6/image/upload/v1761718226/36102445_2211.w026.n002.2792B.p1.2792_zlvdws.jpg",
  },
  {
    title: "StarNite",
    content:
      "StarNite is the main event featuring performances by renowned artists, singers, or bands. It is often the grand finale of the festival, drawing large crowds and creating a memorable experience for attendees.",
    image: "/Gallery Images/DSC_2954.jpg",
    day: "day 4",
    vector:
      "https://res.cloudinary.com/dyqkhzgv6/image/upload/v1761718226/36472048_2211.w026.n002.2797B.p1.2797_zru3zp.jpg",
  },
];
