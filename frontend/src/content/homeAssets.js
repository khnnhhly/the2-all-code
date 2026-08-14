import { HOME_SHOWCASE_IMAGES } from '../imageAssets';

/** Homepage media & structured service rows */

// Note: Google Drive autoplay is browser-dependent; muted autoplay is more reliable.
export const HERO_DRIVE_VIDEO =
  'https://drive.google.com/file/d/15OV6QAPpKqeuqII6dpLGjYnslS_uQDsc/preview?autoplay=1&mute=1&playsinline=1';

export const COUPLES_DRIVE_VIDEO =
  'https://drive.google.com/file/d/1LLujyb_zh2cvukWCc2Mfg9tWWUDu557G/preview';

export const VIDEO_SECTION_BG =
  'https://i.ibb.co/Rpjr2S7q/en-tra-ng-tony.jpg';

export const CLOSING_SECTION_BG =
  'https://i.ibb.co/M5gTXZgj/168-T9ukxls-MPsm-Seu-ASk2kpk-Jvk-Ou-4-Ma.jpg';

export const HOME_STAT_HIGHLIGHTS = {
  en: [
    { value: '50+', label: 'weddings planned' },
    { value: '3+', label: 'years of experience' },
    { value: '3', label: 'countries, one team' },
  ],
  vi: [
    { value: '50+', label: 'đám cưới đã thực hiện' },
    { value: '3+', label: 'năm kinh nghiệm' },
    { value: '3', label: 'quốc gia, một đội ngũ' },
  ],
};

export const HOME_WEDDING_SERVICES = {
  en: [
    {
      id: 'full-plan',
      name: 'Wedding planning',
      desc: 'Comprehensive, end-to-end guidance from your initial concept and budget management to vendor curation, ensuring your dream wedding is seamlessly brought to life.',
      details: [
        'Master planning, timeline creation, and budget tracking.',
        'Vendor scouting, contract negotiation, and booking management.',
        'On-site coordination, rehearsal oversight, and crisis management.',
      ],
      img: 'https://i.ibb.co/wZS1MYgj/DSC03019.jpg',
      page: 'services',
    },
    {
      id: 'coord',
      name: 'Wedding coordination',
      desc: 'Professional month-of management that takes over vendor logistics and finalizes timelines, freeing you to fully enjoy a stress-free and flawlessly executed wedding day.',
      details: [
        'Vendor handover and contract review (4-6 weeks prior).',
        'Detailed wedding day itinerary and technical timeline creation.',
        'Full-day on-site coordination, guest flow control, and troubleshooting.',
      ],
      img: 'https://i.ibb.co/60L16V4t/IMG-1295.jpg',
      page: 'services',
    },
    {
      id: 'concept',
      name: 'Wedding decoration',
      desc: 'Tailored creative direction that transforms your unique love story into a cohesive visual aesthetic, meticulously managing everything from spatial design to decor details.',
      details: [
        'Custom concept design, moodboards, and color palette creation.',
        '2D/3D layout design for stages, photo booths, and table styling.',
        'On-site styling supervision and execution of all decorative elements.',
      ],
      img: 'https://i.ibb.co/XZ114Pwq/L1006104.jpg',
      page: 'services',
    },
    {
      id: 'dest',
      name: 'Destination wedding',
      desc: 'Exquisite multi-day celebration planning in extraordinary locations, seamlessly blending travel logistics with beautiful wedding events for an unforgettable guest experience.',
      details: [
        'Venue scouting and local vendor sourcing/management.',
        'Guest logistics, accommodation booking, and transport coordination.',
        'Planning of surrounding events (Welcome Dinner, Pool Party, Farewell Brunch).',
      ],
      img: 'https://i.ibb.co/z3mt2BN/MER01311-1.jpg',
      page: 'services',
    },
  ],
  vi: [
    {
      id: 'full-plan',
      name: 'wedding planning trọn gói',
      desc: 'Đồng hành toàn diện từ concept ban đầu, quản lý ngân sách đến tuyển chọn nhà cung cấp, để đám cưới trong mơ của hai bạn được hiện thực hóa liền mạch.',
      details: ['lập master plan, timeline và theo dõi ngân sách', 'tìm kiếm vendor, thương lượng hợp đồng và quản lý booking', 'điều phối hiện trường, rehearsal và xử lý tình huống phát sinh'],
      img: 'https://i.ibb.co/wZS1MYgj/DSC03019.jpg',
      page: 'services',
    },
    {
      id: 'coord',
      name: 'điều phối ngày cưới',
      desc: 'Quản lý chuyên nghiệp trong giai đoạn cuối, tiếp nhận logistics với vendor và hoàn thiện timeline để hai bạn tận hưởng ngày cưới nhẹ nhàng.',
      details: ['tiếp nhận vendor và rà soát hợp đồng trước 4-6 tuần', 'xây dựng itinerary ngày cưới và timeline kỹ thuật chi tiết', 'điều phối trọn ngày, kiểm soát luồng khách và xử lý sự cố'],
      img: 'https://i.ibb.co/60L16V4t/IMG-1295.jpg',
      page: 'services',
    },
    {
      id: 'concept',
      name: 'concept & styling',
      desc: 'Định hướng sáng tạo riêng để chuyển hóa câu chuyện của hai bạn thành một tổng thể thẩm mỹ nhất quán, từ thiết kế không gian đến từng chi tiết decor.',
      details: ['thiết kế concept, moodboard và bảng màu riêng', 'thiết kế layout 2D/3D cho sân khấu, photobooth và bàn tiệc', 'giám sát styling và triển khai toàn bộ chi tiết trang trí'],
      img: 'https://i.ibb.co/XZ114Pwq/L1006104.jpg',
      page: 'services',
    },
    {
      id: 'dest',
      name: 'đám cưới tại điểm đến',
      desc: 'Lên kế hoạch cho lễ cưới nhiều ngày tại những địa điểm đặc biệt, kết hợp logistics du lịch và các sự kiện cưới thành một trải nghiệm đáng nhớ.',
      details: ['tìm kiếm địa điểm và quản lý vendor địa phương', 'điều phối khách mời, lưu trú và di chuyển', 'lên kế hoạch các sự kiện đi kèm như welcome dinner, pool party, farewell brunch'],
      img: 'https://i.ibb.co/z3mt2BN/MER01311-1.jpg',
      page: 'services',
    },
  ],
};

export const HOME_EVENT_SERVICES = {
  en: [
    {
      name: 'Anniversary Celebrations',
      desc: 'Meaningful gatherings to celebrate your milestones.',
      img: 'https://i.ibb.co/CpfXyQ62/cf415e1f806724736659b47e28597d31.jpg',
      page: 'services',
    },
    {
      name: 'Proposal Planning',
      desc: 'Thoughtfully planned proposals designed around your story.',
      img: 'https://i.ibb.co/HfPhkkwS/236605b9db53e24ff81c692c3f841eea.jpg',
      page: 'services',
    },
    {
      name: 'Birthday & Private Events',
      desc: "Personalized celebrations for life's special moments.",
      img: 'https://i.ibb.co/3yk5qkkx/c90db1fdd14cc874993401636ff35d7c.jpg',
      page: 'services',
    },
    {
      name: 'Gender Reveal & Baby Celebrations',
      desc: 'Joyful events welcoming a new chapter for your family.',
      img: 'https://i.ibb.co/3ymvp8Dz/199513bb1bbf17629954e2a1c6a42d4f.jpg',
      page: 'services',
    },
  ],
  vi: [
    {
      name: 'Kỷ Niệm Ngày Cưới',
      desc: 'Kỷ niệm những cột mốc ý nghĩa của hai bạn.',
      img: 'https://i.ibb.co/CpfXyQ62/cf415e1f806724736659b47e28597d31.jpg',
      page: 'services',
    },
    {
      name: 'Lên Kế Hoạch Cầu Hôn',
      desc: 'Khoảnh khắc cầu hôn được thiết kế quanh câu chuyện riêng.',
      img: 'https://i.ibb.co/HfPhkkwS/236605b9db53e24ff81c692c3f841eea.jpg',
      page: 'services',
    },
    {
      name: 'Sinh Nhật & Sự Kiện Riêng Tư',
      desc: 'Những buổi lễ cá nhân cho khoảnh khắc đặc biệt.',
      img: 'https://i.ibb.co/3yk5qkkx/c90db1fdd14cc874993401636ff35d7c.jpg',
      page: 'services',
    },
    {
      name: 'Gender Reveal & Baby Celebration',
      desc: 'Chào đón chương mới cùng gia đình và người thân.',
      img: 'https://i.ibb.co/3ymvp8Dz/199513bb1bbf17629954e2a1c6a42d4f.jpg',
      page: 'services',
    },
  ],
};

export const HOME_SHOWCASE_CAROUSEL = HOME_SHOWCASE_IMAGES;
