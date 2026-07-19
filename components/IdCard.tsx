"use client";

/**
 * Recreated SRM student ID card (vector, no photo used).
 * Shared by all three lanyards. Swap the avatar for a real headshot later.
 */
export default function IdCard() {
  return (
    <div
      className="relative w-[236px] select-none overflow-hidden rounded-[11px] bg-white text-[#10306b] shadow-[0_20px_46px_rgba(0,0,0,0.5)]"
      style={{ border: "1px solid rgba(0,0,0,0.15)" }}
    >
      {/* header */}
      <div className="flex items-center gap-2 px-3 pt-3">
        <div
          className="h-8 w-8 shrink-0 rounded-full"
          style={{
            background:
              "radial-gradient(circle at 50% 45%, #1a7a3c 0 40%, #d4af37 41% 58%, #0a2a6b 59% 100%)",
          }}
        />
        <div className="leading-none">
          <div className="text-[23px] font-extrabold tracking-tight text-[#0a2a6b]">
            SRM
          </div>
          <div className="text-[5.5px] font-semibold tracking-wide text-[#0a2a6b]">
            INSTITUTE OF SCIENCE &amp; TECHNOLOGY
          </div>
          <div className="text-[4.5px] italic text-[#43506a]">
            (Deemed to be University u/s 3 of UGC Act, 1956)
          </div>
        </div>
      </div>

      {/* faculty band */}
      <div className="mx-3 mt-1 border-y-2 border-[#0a2a6b] py-[2px] text-center text-[10px] font-bold tracking-wide text-[#0a2a6b]">
        FACULTY OF ENGINEERING &amp; TECHNOLOGY
      </div>

      {/* photo on cream */}
      <div className="mt-2 flex justify-center bg-gradient-to-b from-[#efe2c8] to-[#e6d3ad] py-2">
        <div className="h-[78px] w-[66px] overflow-hidden rounded-[3px] bg-[#cfe3ea]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/om-id-photo.jpg"
            alt="Om Pathania"
            draggable={false}
            className="h-full w-full object-cover"
            style={{ objectPosition: "50% 14%" }}
          />
        </div>
      </div>

      {/* fields */}
      <div className="space-y-[3px] px-3 py-2 text-[9.5px]">
        <Row k="Name" v="OM PATHANIA" strong />
        <Row k="Programme" v="B.Tech.(CSE)" />
        <Row k="Register No." v="RA2411003012495" />
        <Row k="Valid From" v="Jun-2024  To  May-2028" />
      </div>

      {/* footer */}
      <div className="bg-[#1f6fb2] px-2 py-[5px] text-center text-[7px] leading-[1.5] text-white">
        Kattankulathur Campus
        <br />
        Chengalpattu Dt., Tamil Nadu - 603 203.
        <br />
        Ph: 044-27417777
        <br />
        Email: student.services.cet.ktr@srmist.edu.in
        <br />
        Website: www.srmist.edu.in
      </div>
      <div className="bg-[#16456e] py-[2px] text-center text-[8.5px] font-bold tracking-[0.3em] text-white">
        STUDENT
      </div>
    </div>
  );
}

function Row({ k, v, strong }: { k: string; v: string; strong?: boolean }) {
  return (
    <div className="flex gap-1">
      <span className="w-[68px] shrink-0 font-semibold text-[#10306b]">{k}</span>
      <span className="text-[#10306b]">:</span>
      <span className={strong ? "font-bold" : ""}>{v}</span>
    </div>
  );
}
