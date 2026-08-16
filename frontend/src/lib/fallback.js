export function getFallbackData(currentLang) {
  const isVi = currentLang === 'vi';

  return {
    settings: {
      brandName: 'The Two Planner',
      footerBrandTagline: isVi 
        ? 'Lập kế hoạch đám cưới & phong cách hóa trải nghiệm.' 
        : 'Bespoke wedding planning & event styling.',
      email: 'thetwoplanner@gmail.com',
      phones: [
        { phoneNumber: '+84984898070', label: { vi: 'Ly (Lead Planner)', en: 'Ly (Lead Planner)' } },
        { phoneNumber: '+84862366956', label: { vi: 'Nhi (Planner)', en: 'Nhi (Planner)' } }
      ],
      address: isVi 
        ? 'Dựa tại Việt Nam · Có mặt trên toàn thế giới' 
        : 'Based in Vietnam · Available worldwide',
      copyright: `© ${new Date().getFullYear()} The Two Planner. All rights reserved.`,
      exploreLinks: [],
      servicesLinks: []
    },
    home: {
      heroSection: {
        smallSubheading: 'the two · for you two',
        mainHeadline: isVi ? 'Nơi câu chuyện của bạn được viết nên thành một dấu ấn trọn đời' : 'Where your story becomes a lifetime moment',
        description: isVi 
          ? 'Chúng tôi phác thảo và đồng hành thực hiện những chi tiết cảm xúc trong ngày trọng đại của bạn.'
          : 'We sketch, plan, and style intimate celebrations held together by real emotion.',
        ctaButtons: [
          { _key: '1', label: isVi ? 'Sẵn sàng kể The Two nghe' : 'Start your story', link: 'contact', variant: 'primary' },
          { _key: '2', label: isVi ? 'Dự án của The Two' : 'See our works', link: 'showcase', variant: 'secondary' }
        ]
      },
      letterSection: {
        scriptTitle: isVi ? 'Gửi những cặp đôi yêu quý của The Two,' : 'Dear our beloved couple,',
        subheading: isVi ? 'Chào mừng bạn đến với The Two Planner' : 'Welcome to The Two Planner',
        paragraphs: [
          {
            paragraphText: isVi
              ? 'Chúng tôi tin rằng mỗi ngày cưới không chỉ là một sự kiện, mà là một chương truyện chân thực nhất về tình yêu của hai bạn. Nơi mọi chi tiết, từ những nhánh hoa nhỏ đến nhịp điệu của buổi lễ, đều phản chiếu tính cách và cảm xúc riêng.'
              : 'We believe that a wedding day is not just an event, but a living, breathing story of who you are. Every detail, from the choice of music to the styling of the tables, should feel unmistakably yours.'
          }
        ],
        closingSignOff: isVi ? 'Thân thương, The Two Planner' : 'Warm regards, The Two Planner'
      },
      weddingServicesSection: {
        mainHeader: isVi ? 'Chúng tôi phác thảo và mang đến' : 'We sketch and provide',
        categoryLabel: isVi ? 'Dịch vụ đám cưới' : 'Wedding services',
        servicesList: [
          {
            serviceNumber: '01',
            title: isVi ? 'Lên kế hoạch đám cưới trọn gói' : 'Full wedding planning',
            shortDescription: isVi 
              ? 'Đồng hành từ những bước đầu tiên: quản lý ngân sách, lựa chọn địa điểm, và điều phối trọn vẹn.'
              : 'A complete partnership from beginning to end: budget layout, venue scouting, and seamless execution.',
            scopeItems: [
              isVi ? 'Tìm kiếm & khảo sát địa điểm' : 'Venue curation & visits',
              isVi ? 'Quản lý ngân sách & nhà cung cấp' : 'Budget tracking & vendor negotiations',
              isVi ? 'Ý tưởng kịch bản chương trình' : 'Timeline & script development'
            ]
          }
        ]
      },
      eventServicesSection: {
        headerTitle: isVi ? 'Dịch vụ sự kiện' : 'Event services',
        eventItems: [
          {
            title: isVi ? 'Lễ cầu hôn lãng mạn' : 'Intimate Proposal',
            description: isVi ? 'Lập kế hoạch và thiết kế không gian cầu hôn hoàn hảo.' : 'Tailored planning and layout design for your special moment.'
          }
        ]
      },
      statsAndPartnersSection: {
        partnerHeader: isVi ? 'Chúng tôi đã đồng hành cùng' : 'We have worked with',
        stats: [
          { value: '50+', label: isVi ? 'Đám cưới thành công' : 'Weddings designed' },
          { value: '3+', label: isVi ? 'Năm kinh nghiệm' : 'Years of experience' }
        ],
        partnerLogos: []
      },
      showcaseSection: {
        categoryTag: isVi ? 'Đám cưới tiêu biểu' : 'Wedding showcase',
        mainTitle: 'Love is in the air',
        instructionText: isVi ? 'kéo ngang để khám phá thêm' : 'drag or swipe to explore',
        gallery: []
      },
      testimonialVideoSection: {
        quoteTitle: isVi ? 'Hãy lắng nghe chia sẻ từ các cặp đôi' : 'Hear it directly from our couples',
        coupleDetails: 'Tony & Myriam · Saigon 2025',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
      },
      preFooterCtaSection: {
        bannerHeadline: isVi ? 'Hãy kể câu chuyện của bạn cho chúng tôi' : 'Let us write your happy ever after',
        bannerSubtext: 'thetwoplanner@gmail.com · Based in Vietnam · Available worldwide',
        ctaButtonText: isVi ? 'Liên hệ ngay' : 'Get in touch'
      }
    },
    about: {
      heroSection: {
        headline: isVi ? 'Về chúng tôi' : 'About us',
        subheading: 'The Two Planner'
      },
      missionVisionSection: {
        mission: {
          title: isVi ? 'Sứ mệnh' : 'Mission',
          content: isVi 
            ? 'Mang lại những ngày kỷ niệm chân thực nhất, nơi tình yêu của hai bạn được tôn vinh một cách tự nhiên.'
            : 'To craft authentic celebrations where your love story takes center stage naturally.'
        },
        vision: {
          title: isVi ? 'Tầm nhìn' : 'Vision',
          content: isVi
            ? 'Trở thành người bạn đồng hành tin cậy cho những cặp đôi tìm kiếm sự tinh tế, ấm áp và ý nghĩa.'
            : 'To be the trusted companion for couples seeking sophistication, warmth, and meaning.'
        }
      },
      testimonialsSection: {
        categoryTag: isVi ? 'đánh giá' : 'testimonials',
        mainHeadline: isVi ? 'Cảm nhận từ khách hàng' : 'From our couples',
        testimonialCards: []
      },
      teamSection: {
        categoryTag: isVi ? 'đội ngũ' : 'our team',
        mainHeadline: isVi ? 'Những người đứng sau' : 'Meet the planners',
        members: [
          {
            fullName: 'Ly Nguyen',
            role: 'Lead Wedding Planner',
            stats: '50+ Weddings',
            strengths: 'Organization · Empathy · Creative direction',
            bio1: isVi ? 'Đam mê tạo ra các đám cưới ngập tràn cảm xúc.' : 'Passionate about crafting emotion-filled celebrations.',
            quote: isVi ? 'Mỗi đám cưới là một tác phẩm nghệ thuật độc bản.' : 'Every wedding is a unique piece of art.'
          }
        ]
      },
      preFooterCtaSection: {
        headline: isVi ? 'Hãy cùng tạo nên ngày cưới trong mơ' : 'Let\'s design your dream day together',
        ctaButton: {
          label: isVi ? 'Bắt đầu câu chuyện' : 'Start your story',
          link: 'contact'
        }
      }
    },
    services: {
      heroSection: {
        headline: isVi ? 'Dịch vụ của chúng tôi' : 'Our services',
        subheading: isVi ? 'Bespoke planning & styling' : 'Bespoke planning & styling',
        description: isVi ? 'Giải pháp thiết kế trọn gói cho ngày trọng đại của bạn.' : 'Full planning and styling solutions tailored for you.'
      },
      weddingCarouselSection: {
        sectionCategory: isVi ? 'Đám cưới' : 'Wedding',
        sectionHeadline: isVi ? 'Đám cưới mang hơi thở của bạn' : 'Weddings that feel like you.',
        weddingServices: []
      },
      eventCarouselSection: {
        sectionCategory: isVi ? 'Sự kiện' : 'Event',
        sectionHeadline: isVi ? 'Những dấu mốc đáng nhớ' : 'Private celebrations.',
        eventServices: []
      },
      faqSection: {
        categoryTag: 'FAQs',
        mainHeadline: isVi ? 'Câu hỏi thường gặp' : 'Common questions',
        subheading: '',
        weddingFaqs: [
          { question: isVi ? 'Nên thuê Planner trước bao lâu?' : 'When should we hire a planner?', answer: isVi ? 'Tốt nhất là từ 6 đến 9 tháng trước ngày cưới.' : 'Ideally 6 to 9 months before the wedding.' }
        ],
        eventFaqs: []
      },
      preFooterCtaSection: {
        headline: isVi ? 'Hãy để The Two Planner đồng hành cùng bạn' : 'Let us style your next celebration',
        ctaButton: {
          label: isVi ? 'Liên hệ tư vấn' : 'Request Consultation'
        }
      }
    },
    works: {
      heroSection: {
        headline: isVi ? 'Các dự án' : 'Our works',
        subheading: 'Love stories we had the privilege to write',
        regions: []
      },
      portfolioSection: {
        filterTabs: ['all', 'wedding', 'events', 'destination'],
        featuredProjects: []
      },
      preFooterCtaSection: {
        headline: isVi ? 'Bạn đã sẵn sàng cho câu chuyện của riêng mình?' : 'Ready to start your own story?',
        ctaButton: {
          label: isVi ? 'Liên hệ ngay' : 'Get in touch'
        }
      }
    },
    contact: {
      heroSection: {
        headline: isVi ? 'Liên hệ' : 'Contact us',
        subheading: isVi ? 'Hãy chia sẻ câu chuyện của bạn' : 'Tell us your story'
      },
      formSection: {
        mainBubbleText: isVi 
          ? 'Chào bạn! Rất vui được đón tiếp. Hãy để lại lời nhắn nhé!' 
          : 'Hello! We are thrilled you\'re here. Tell us a bit about your dream day?',
        quickChoices: ['A romantic wedding', 'An intimate proposal', 'An anniv/private party'],
        successMessageTitle: isVi ? 'Gửi thành công!' : 'Request Sent!',
        successMessageDescription: isVi ? 'Cảm ơn bạn đã liên hệ. Chúng tôi sẽ phản hồi sớm nhất.' : 'Thank you for reaching out. We will get back to you shortly.',
        successMessageOutro: '',
        notes: ''
      },
      preFooterCtaSection: {
        headline: isVi ? 'Chúng tôi luôn lắng nghe' : 'We are always listening',
        subheading: 'thetwoplanner@gmail.com'
      }
    },
    testimonials: [],
    projects: []
  };
}

export function mergeSanityData(sanityData, currentLang) {
  const fallback = getFallbackData(currentLang);
  if (!sanityData) return fallback;

  return {
    settings: { ...fallback.settings, ...sanityData.settings },
    home: { ...fallback.home, ...sanityData.home },
    about: { ...fallback.about, ...sanityData.about },
    services: { ...fallback.services, ...sanityData.services },
    works: { ...fallback.works, ...sanityData.works },
    contact: { ...fallback.contact, ...sanityData.contact },
    testimonials: sanityData.testimonials || fallback.testimonials,
    projects: sanityData.projects || fallback.projects
  };
}
