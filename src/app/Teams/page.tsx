"use client";
import { Key, useMemo, useState, useRef } from "react";
import SecyCard from "../components/SecyCard";
import AnimatedDropdown from "../components/AnimatedDropdown";
import { contentContainerClass } from "../components/layoutTokens";
import Pagination, { usePagination } from "../components/Pagination";

const teams = {
  Photog: [
    {
      name: "Piyush Mishra",
      role: "Secretary",
      desc: "Crafts cinematic stories through still frames.",
      img: "https://res.cloudinary.com/dyqkhzgv6/image/upload/v1761735860/DSC_0832_1_-_PIYUSH_MISHRA_gzwcib.jpg",
    },
    {
      name: "Darshpreet Kaur",
      role: "Secretary",
      desc: "Curates event coverage with precision.",
      img: "https://res.cloudinary.com/dyqkhzgv6/image/upload/v1761735857/IMG_2811_-_Darshpreet_kaur_mcpsas.jpg",
    },
    {
      name: "Nayan Patel",
      role: "Secretary",
      desc: "Loves experimenting with long-exposure shots.",
      img: "https://res.cloudinary.com/dyqkhzgv6/image/upload/v1761735890/DSC_9838_-_Nayan_Patel_mdp5aw.jpg",
    },
    {
      name: "HarshaVardhan Raju",
      role: "Secretary",
      desc: "Grades every frame for that cosmic glow.",
      img: "https://res.cloudinary.com/dyqkhzgv6/image/upload/v1761735860/IMG_9545_-_Harshavardhan_Raju_lgl1at.jpg",
    },
  ],
  MAD: [
    {
      name: "Rishabh Jain",
      role: "Secretary",
      desc: "Managing and directing club",
      img: "https://res.cloudinary.com/dyqkhzgv6/image/upload/v1761738146/Snapchat-532846077_-_RISHABH_JAIN_h9e1xd.jpg",
    },
    {
      name: "Shambhavi Srivastava",
      role: "Secretary",
      desc: "Managing and directing club",
      img: "https://res.cloudinary.com/dyqkhzgv6/image/upload/v1761738146/IMG_20251018_085927_-_Shambhavi_Srivastava_rbh7tt.jpg",
    },
    {
      name: "Nitish Dhaka",
      role: "Secretary",
      desc: "Managing and directing club",
      img: "https://res.cloudinary.com/dyqkhzgv6/image/upload/v1761738146/DSC_0837_1_-_Nitish_Kumar_dafria.jpg",
    },
    {
      name: "Lav dewangan",
      role: "Secretary",
      desc: "Managing and directing club",
      img: "https://res.cloudinary.com/dyqkhzgv6/image/upload/v1761738147/Lav_Dewangan_12216074_MAD_-_Lav_Dewangan_kyrfgm.png",
    },
    {
      name: "Rishu Ranjan",
      role: "Secretary",
      desc: "Managing and directing club",
      img: "https://res.cloudinary.com/dyqkhzgv6/image/upload/v1761738154/DSC_6634_2_-_Rishu_Ranjan_wat5ps.jpg",
    },
    {
      name: "Satyam Thakur",
      role: "Secretary",
      desc: "Managing and directing club",
      img: "https://res.cloudinary.com/dyqkhzgv6/image/upload/v1761740744/IMG_20251018_150229_-_Satyam_Thakur_velip7.jpg",
    },
    {
      name: "Nikhil Agrawal",
      role: "Secretary",
      desc: "Managing and directing club",
      img: "https://res.cloudinary.com/dyqkhzgv6/image/upload/v1761740744/NIKHIL_12212089_MAD_-_NIKHIL_AGRAWAL_lf9j9p.jpg",
    },
  ],
  AVA: [
    {
      name: "Saloni",
      role: "Secretary",
      desc: "Audio and Visual Aid Club",
      img: "https://res.cloudinary.com/dyqkhzgv6/image/upload/v1761739010/IMG_8133_-_Saloni_Yadav_sczbiu.jpg",
    },
    {
      name: "Abhey",
      role: "Secretary",
      desc: "Audio and Visual Aid Club",
      img: "https://res.cloudinary.com/dyqkhzgv6/image/upload/v1761739009/IMG_8904_-_Abhey_Singh_g2oclu.jpg",
    },
    {
      name: "Anant Tripathi",
      role: "Secretary",
      desc: "Audio and Visual Aid Club",
      img: "https://res.cloudinary.com/dyqkhzgv6/image/upload/v1761739008/SAVE_20250826_013620_-_Anant_Tripathi_bwxj3y.jpg",
    },
    {
      name: "Kapil",
      role: "Secretary",
      desc: "Audio and Visual Aid Club",
      img: "https://res.cloudinary.com/dyqkhzgv6/image/upload/v1761739004/IMG-20250826-WA0001_1_-_Kapil_Phogat_ppqx6q.jpg",
    },
  ],
  Colours: [
    {
      name: "Prachi Gupta",
      role: "Secretary",
      desc: "Colours",
      img: "https://res.cloudinary.com/dyqkhzgv6/image/upload/v1761739353/IMG_20250503_164343_Original_-_Prachi_Gupta_tdmgok.jpg",
    },

    {
      name: "Rhythm Garg",
      role: "Secretary",
      desc: "Colours",
      img: "https://res.cloudinary.com/dyqkhzgv6/image/upload/v1761739354/Screenshot_20251016_062920_-_Rhythm_garg_n5lhmv.jpg",
    },

    {
      name: "Ardhansu Das",
      role: "Secretary",
      desc: "Colours",
      img: "https://res.cloudinary.com/dyqkhzgv6/image/upload/v1761739351/IMG_9841_-_Ardhansu_Das_rai8yf.jpg",
    },
  ],
  ELAD: [
    {
      name: "Devesh Tripathi",
      role: "Secretary",
      desc: "ELAD",
      img: "https://res.cloudinary.com/dyqkhzgv6/image/upload/v1761739649/IMG_3267_-_DEVESH_TRIPATHI_vrv6bk.jpg",
    },

    {
      name: "Shreeyanshu Swain",
      role: "Secretary",
      desc: "ELAD",
      img: "https://res.cloudinary.com/dyqkhzgv6/image/upload/v1761739642/IMG_3921_1_2_-_Shreeyanshu_Swain_cv8fgw.jpg",
    },

    {
      name: "Shreya Sinha",
      role: "Secretary",
      desc: "ELAD",
      img: "https://res.cloudinary.com/dyqkhzgv6/image/upload/v1761739639/IMG-20250527-WA0016_-_Shreya_Sinha_qrzoy0.jpg",
    },
  ],
  "Fine Arts and modelling": [
    {
      name: "Sanchit Bansal",
      role: "Secretary",
      desc: "Fine arts and modelling",
      img: "https://res.cloudinary.com/dyqkhzgv6/image/upload/v1761739847/IMG_0607_-_SANCHIT_BANSAL_gaptpe.jpg",
    },
    {
      name: "Tammam Beentey Ali",
      role: "Secretary",
      desc: "Fine arts and modelling",
      img: "https://res.cloudinary.com/dyqkhzgv6/image/upload/v1761739843/Snapchat-1621291499_-_Tammam_Beentey_Ali_n5zs7v.jpg",
    },
    {
      name: "Rishika Rishika",
      role: "Secretary",
      desc: "Fine arts and modelling",
      img: "https://res.cloudinary.com/dyqkhzgv6/image/upload/v1761739842/IMG-20250826-WA0004_-_RISHIKA_RISHIKA_gvrv0s.jpg",
    },
    {
      name: "Jatin Garg",
      role: "Secretary",
      desc: "Fine arts and modelling",
      img: "https://res.cloudinary.com/dyqkhzgv6/image/upload/v1761739842/IMG-20251005-WA0001_-_Jatin_Garg_skurwp.jpg",
    },
  ],
  "Hiking and Trekking club": [
    {
      name: "Ansh Varshney",
      role: "Secretary",
      desc: "Hiking and Trekking club",
      img: "https://res.cloudinary.com/dyqkhzgv6/image/upload/v1761740014/Ansh_Varshney_12212075_HTC_-_Ansh_Varshney_j4rpig.jpg",
    },
    {
      name: "Aakash Rathee",
      role: "Secretary",
      desc: "Hiking and Trekking club",
      img: "https://res.cloudinary.com/dyqkhzgv6/image/upload/v1761740434/IMG-20250310-WA0015_Original_-_AAKASH_RATHEE_y6pdr4.jpg",
    },
    {
      name: "Kunal Barthwal",
      role: "Secretary",
      desc: "Hiking and Trekking club",
      img: "https://res.cloudinary.com/dyqkhzgv6/image/upload/v1761740432/IMG-20251018-WA0007_-_KUNAL_BARTHWAL_thr95k.jpg",
    },
  ],
  HLAD: [
    {
      name: "Pranay Joshi",
      role: "Secretary",
      desc: "HLAD",
      img: "https://res.cloudinary.com/dyqkhzgv6/image/upload/v1761740178/20250302_210906_-_Pranay_Joshi_ffnnis.jpg",
    },
    {
      name: "Vivek Pal",
      role: "Secretary",
      desc: "HLAD",
      img: "https://res.cloudinary.com/dyqkhzgv6/image/upload/v1761740168/Screenshot_20250708_053838_Gallery_-_Vivek_Pal_kfe0cl.jpg",
    },

    {
      name: "Shubham Keshri",
      role: "Secretary",
      desc: "HLAD",
      img: "https://res.cloudinary.com/dyqkhzgv6/image/upload/v1761740166/Shubham_ProfileImage_-_Shubham_Keshri_tlvkgr.jpg",
    },
    {
      name: "Shraddha Singh",
      role: "Secretary",
      desc: "HLAD",
      img: "https://res.cloudinary.com/dyqkhzgv6/image/upload/v1761740166/IMG_20251019_084729_-_Shraddha_ir5any.jpg",
    },
  ],
  "PG Club": [
    {
      name: "Aakash ",
      role: "Secretary",
      desc: "PG Club",
      img: "https://res.cloudinary.com/dyqkhzgv6/image/upload/v1761740901/AAKASH_-_AAKASH_ge4o3g.jpg",
    },

    {
      name: "Bipul Raj",
      role: "Secretary",
      desc: "PG Club",
      img: "https://res.cloudinary.com/dyqkhzgv6/image/upload/v1761740885/IMG-20250919-WA0063_-_Bipul_Raj_lbytiy.jpg",
    },
    {
      name: "Amit Panwar",
      role: "Secretary",
      desc: "PG Club",
      img: "https://res.cloudinary.com/dyqkhzgv6/image/upload/v1761741240/Screenshot_20251022_162954_Instagram_-_Amit_Panwar_kaw95g.jpg",
    },
  ],
  MCC: [
    {
      name: "Divyansh Pankholi",
      role: "Secretary",
      desc: "Multi Cultural Club",
      img: "https://res.cloudinary.com/dyqkhzgv6/image/upload/v1761741013/20250101_162214_-_Divyansh_Pankholi_pg5anv.jpg",
    },
    {
      name: "Harish Kumar",
      role: "Secretary",
      desc: "Multi Cultural Club",
      img: "https://res.cloudinary.com/dyqkhzgv6/image/upload/v1761741001/467362202_540544828946008_7833060864543031717_n.heic_2_-_HARISH_KUMAR_et6qll.jpg",
    },
    {
      name: "Sarthak Vatsa",
      role: "Secretary",
      desc: "Multi Cultural Club",
      img: "https://res.cloudinary.com/dyqkhzgv6/image/upload/v1761740887/20250822_183823_-_SARTHAK_VATSA_pgzbym.jpg",
    },
  ],
  Spicmacy: [
    {
      name: "Pawan Gupta",
      role: "Secretary",
      desc: "Spicmacy",
      img: "https://res.cloudinary.com/dyqkhzgv6/image/upload/v1761741370/IMG_20251017_212546_-_PAWAN_GUPTA_vjtvym.jpg",
    },
    {
      name: "Dhruv Gupta",
      role: "Secretary",
      desc: "Spicmacy",
      img: "https://res.cloudinary.com/dyqkhzgv6/image/upload/v1761741368/IMG_0292_-_Dhruv_Gupta_pbuocn.jpg",
    },
    {
      name: "Aryawart Kathpal",
      role: "Secretary",
      desc: "Spicmacy",
      img: "https://res.cloudinary.com/dyqkhzgv6/image/upload/v1761741365/IMG-20251013-WA0030_1_-_Aryawart_Kathpal_cxpweu.jpg",
    },
  ],
};

export default function TeamSection() {
  const [selectedClub, setSelectedClub] =
    useState<keyof typeof teams>("Photog");
  const sectionRef = useRef<HTMLDivElement>(null);

  const teamOptions = useMemo(
    () => Object.keys(teams).map((club) => ({ id: club, label: club })),
    []
  );

  const currentTeamMembers = teams[selectedClub];

  // Pagination: Reads config from CSS variables (--pagination-teams-mobile/desktop)
  const {
    currentItems: paginatedMembers,
    currentPage,
    totalPages,
    setCurrentPage,
  } = usePagination(currentTeamMembers, "teams");

  return (
    <div
      ref={sectionRef}
      className="relative w-full max-w-[100vw] overflow-x-hidden"
    >
      <div
        className={`${contentContainerClass} section-content flex flex-col items-center`}
      >
        <h1 className="section-heading text-center text-3xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
          TEAMS
        </h1>

        <AnimatedDropdown
          items={teamOptions}
          selectedId={selectedClub}
          onSelect={(item) => setSelectedClub(item.id as keyof typeof teams)}
          placeholder="Choose a team"
          className="w-full max-w-xs"
        />

        <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 sm:justify-items-center lg:grid-cols-3 xl:gap-8">
          {paginatedMembers.map(
            (
              member: { name: string; role: string; desc: string; img: string },
              index: Key | null | undefined
            ) => (
              <SecyCard
                key={index}
                name={member.name}
                role={member.role}
                desc={member.desc}
                img={member.img}
                index={typeof index === "number" ? index : 0}
              />
            )
          )}
        </div>

        {/* Pagination Controls */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          sectionRef={sectionRef}
          className="mt-8"
        />
      </div>
    </div>
  );
}
