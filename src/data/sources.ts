import type { Source } from "../domain/types";

/** Every source a myth cites, by the key the myth names it with. */
export const sources = {
  ansm: {
    title: "Afssaps/ANSM, письмо врачам о противопоказании муколитиков до 2 лет (апрель 2010)",
    url: "https://archive.ansm.sante.fr/content/download/25633/339709/version/2/file/lp-100429-MucolytiquesM%C3%A9decins.pdf",
  },
  ansmqr: {
    title: "ANSM, вопросы и ответы о кашле у детей до 2 лет",
    url: "https://archive.ansm.sante.fr/content/download/28999/382882/version/7/file/QR-toux-nourissons.pdf",
  },
  who: {
    title:
      "WHO, Cough and cold remedies for the treatment of acute respiratory infections in young children (2001)",
    url: "https://www.who.int/publications-detail-redirect/WHO_FCH_CAH_01.02",
  },
  bmj: {
    title: "Gill et al., Treatments for cough and common cold in children. BMJ 2024",
    url: "https://doi.org/10.1136/bmj-2023-075306",
  },
  sperl: {
    title:
      "Sperl et al., обратимая вено-окклюзионная болезнь у ребёнка 18 мес после травяного чая. Eur J Pediatr 1995",
    url: "https://link.springer.com/article/10.1007/BF01991912",
  },
  colt: {
    title: "Drugs.com, монография Coltsfoot (мать-и-мачеха)",
    url: "https://drugs.com/npp/coltsfoot.html",
  },
  lic: {
    title:
      "Университет Хельсинки о работе Räikkönen et al., Am J Epidemiol 2017 (солодка при беременности)",
    url: "https://www.helsinki.fi/en/news/healthier-world/new-study-confirms-pregnant-women-should-avoid-liquorice",
  },
  garlic: {
    title: "Healthline, Garlic in ear: риски раздражения и ожога",
    url: "https://www.healthline.com/health/garlic-in-ear",
  },
  aap: {
    title: "AAP, памятка Fever and Your Child",
    url: "https://www.stonybrookmedicine.edu/sites/default/files/40105156.pdf",
  },
  iso: {
    title: "McFadden, Haddow. Coma produced by topical application of isopropanol. Pediatrics 1969",
    url: "https://doi.org/10.1542/peds.43.4.622",
  },
  ihdi: {
    title: "International Hip Dysplasia Institute, позиция по пеленанию",
    url: "https://hipdysplasia.org/swaddling-education/",
  },
  kmn1: {
    title: "Ожог глаза кристаллами перманганата калия у ребёнка 6 лет (PMC8456250)",
    url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8456250",
  },
  kmn2: {
    title: "Chirapapaisan et al., Ocular injury due to potassium permanganate granules, 2018",
    url: "https://pubmed.ncbi.nlm.nih.gov/29643795/",
  },
  msd: {
    title: "MSD Manual, Constipation in Children",
    url: "https://www.msdmanuals.com/professional/pediatrics/symptoms-in-infants-and-children/constipation-in-children",
  },
  mims: {
    title: "MIMS, Constipation in Children: Management",
    url: "https://www.mims.com/india/disease/constipation-in-children/management",
  },
  dys1: {
    title: "Т—Ж, почему анализ на дисбактериоз не имеет смысла",
    url: "https://t-j.ru/dysbiosis-analysis/",
  },
  dys2: {
    title: "«Дисбактериоз кишечника: терминология…», дискуссионная статья",
    url: "https://infectpataog.elpub.ru/jour/article/download/102/103",
  },
  arb1: {
    title: "Feng et al., систематический обзор и метаанализ арбидола, 2022",
    url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC9716115",
  },
  arb2: {
    title: "Протокол Кокрейновского обзора по арбидолу при гриппе",
    url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC6464131",
  },
  arb3: {
    title: "Исследование АРБИТР (умифеновир против плацебо)",
    url: "https://journals.rcsi.science/0040-3660/article/view/33014",
  },
  kag: {
    title: "Боровская, обзор безопасности Кагоцела. Терапевтический архив 2017",
    url: "https://doaj.org/article/87b0abb3eaa64d76bfe07bb0d86c7723",
  },
  thu1: {
    title: "Burkhard et al., Plant-induced seizures. J Neurol 1999",
    url: "https://pubmed.ncbi.nlm.nih.gov/10460442/",
  },
  thu2: {
    title: "ADLM, Toxin spotlight: thujone, 2026",
    url: "https://myadlm.org/science-and-research/toxin-spotlight/thujone",
  },
  flush: {
    title: "Full Fact о «чистке печени и желчного» и публикации в The Lancet 2005",
    url: "https://fullfact.org/health/gallbladder-flush-stones-alternative-therapy/",
  },
  d1: {
    title:
      "Hmami et al., девять случаев гиперкальциемии после 600 000 МЕ витамина D. Arch Pédiatr 2014",
    url: "https://read.qxmd.com/read/25129320/-overdose-or-hypersensitivity-to-vitamin-d",
  },
  d2: {
    title: "Тяжёлая гиперкальциемия у младенца 3 мес из-за БАД с витамином D, 2022",
    url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8844365",
  },
  d3: {
    title: "Нефрокальциноз у ребёнка из-за БАД с витамином D. Front Pediatr 2024",
    url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC11611577/",
  },
  fe1: {
    title:
      "Rampton et al., реакции гиперчувствительности на внутривенное железо. Haematologica 2014",
    url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC4222472",
  },
  cdcbot: {
    title: "CDC, профилактика ботулизма: мёд и детский ботулизм",
    url: "https://www.cdc.gov/botulism/prevention/index.html",
  },
  water1: {
    title: "Consultant360, Do Infants Need to Drink Water? (обзор рекомендаций ВОЗ и AAP)",
    url: "https://www.consultant360.com/articles/do-infants-need-drink-water",
  },
  water2: {
    title: "KGW Verify: безопасна ли вода для детей до 6 месяцев",
    url: "https://www.kgw.com/article/news/verify/health-verify/babies-infants-newborns-drinking-water-6-months-fact-check/536-c868e957-3421-4e79-beed-d1b070675d61",
  },
  reye: {
    title: "NHS, Reye's syndrome",
    url: "https://www.nhs.uk/conditions/reyes-syndrome/",
  },
  abx: {
    title:
      "Kenealy, Arroll. Antibiotics for the common cold and acute purulent rhinitis. Cochrane, 2013",
    url: "https://www.cochranelibrary.com/cdsr/doi/10.1002/14651858.CD000247.pub3/information/en",
  },
  abx2: {
    title: "IQWiG/NCBI, Should you take antibiotics if you have a cold?",
    url: "https://www.ncbi.nlm.nih.gov/books/NBK279540/",
  },
  steam1: {
    title:
      "Al Himdani et al., Home remedy or hazard? Ожоги при паровых ингаляциях у детей. Br J Gen Pract 2016",
    url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC4758499",
  },
  steam2: {
    title: "Murphy et al., Burns caused by steam inhalation in children. BMJ 2004",
    url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC381331",
  },
  steam3: {
    title: "News-Medical о нидерландском исследовании ожогов при паровых ингаляциях, 2012",
    url: "https://www.news-medical.net/news/20120627/Common-cold-remedy-not-recommended-for-children.aspx",
  },
  must: {
    title: "Yabanoglu et al., ожог второй степени от горчичной аппликации. Case Rep Med 2012",
    url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC3362821",
  },
  cup: {
    title: "Серия случаев: ожоги от банок у младенца 8 месяцев. Children 2024",
    url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC11430524/",
  },
  walk: {
    title: "Nationwide Children's Hospital об исследовании травм в ходунках (Pediatrics, 2018)",
    url: "https://www.nationwidechildrens.org/newsroom/news-releases/2018/09/injuries-associated-with-infant-walkers-sending-kids-to-the-emergency-department",
  },
  fda: {
    title: "Предупреждение FDA об украшениях и гелях для прорезывания зубов, 2018",
    url: "https://www.news-medical.net/news/20181221/FDA-warns-against-use-of-jewelry-to-relieve-teething-pain-in-children.aspx",
  },
  sleep: {
    title: "AAP, рекомендации по безопасному сну младенцев, 2022",
    url: "https://www.healthychildren.org/English/news/Pages/safe-sleep-back-is-best-avoid-soft-bedding-inclined-surfaces-and-bedsharing.aspx?form=XCXCUUZZ",
  },
  burn: {
    title: "NHS, Burns and scalds",
    url: "https://www.nhs.uk/conditions/Burns-and-scalds/",
  },
  seiz: {
    title: "CDC, First Aid for Seizures",
    url: "https://www.cdc.gov/epilepsy/first-aid-for-seizures/index.html",
  },
  osc: {
    title: "Cochrane, Homeopathic Oscillococcinum for preventing and treating influenza, 2015",
    url: "https://www.cochrane.org/evidence/CD001957_homeopathic-oscillococcinumr-preventing-and-treating-influenza-and-influenza-illness",
  },
  nose1: {
    title: "St John Ambulance, Nosebleeds",
    url: "https://www.sja.org.uk/first-aid-advice/nosebleed/",
  },
  nose2: {
    title: "Healthdirect Australia, Nosebleed",
    url: "https://www.healthdirect.gov.au/symptoms/nosebleed",
  },
  cold1: {
    title:
      "Johnson, Eccles. Acute cooling of the feet and the onset of common cold symptoms. Fam Pract 2005",
    url: "https://pubmed.ncbi.nlm.nih.gov/16286463/",
  },
  cold2: {
    title: "Michigan Medicine, 6 ways to keep your child from catching a cold",
    url: "https://healthblog.uofmhealth.org/childrens-health/6-ways-to-keep-your-child-from-catching-a-cold",
  },
  throat1: {
    title: "NHS 111 Wales, Sore throat",
    url: "https://111.wales.nhs.uk/Sorethroat/",
  },
  throat2: {
    title: "Royal Hospital for Children Glasgow, Sore throat",
    url: "https://rhc.nhsggc.org.uk/royal-hospital-for-children-for-patients-carers-visitors/about-your-childs-health-information-resources/concerned-your-child-is-unwell-3-months-and-older/sore-throat/",
  },
  heat1: {
    title: "AAP, How to Keep Your Sleeping Baby Safe",
    url: "https://www.healthychildren.org/English/ages-stages/baby/sleep/Pages/a-Parents-Guide-to-Safe-Sleep.aspx",
  },
  heat2: {
    title: "AAFP, AAP Expands Recommendations on SIDS (перегрев)",
    url: "https://www.aafp.org/afp/2012/0501/p918",
  },
  out: {
    title: "Care.com, педиатры о прогулках при простуде",
    url: "https://www.care.com/c/can-babies-and-kids-go-outside-with-a-cold/",
  },
  vitc: {
    title: "Hemilä, Chalker. Vitamin C for preventing and treating the common cold. Cochrane, 2013",
    url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8078152/",
  },
  choke1: {
    title: "NHS 111 Wales, Choking",
    url: "https://web.archive.org/web/20201125143201/https://111.wales.nhs.uk/encyclopaedia/ch/article/choking",
  },
  choke2: {
    title: "American Red Cross, Adult/Child Choking",
    url: "https://www.redcross.org/take-a-class/resources/learn-first-aid/adult-child-choking",
  },
  choke3: {
    title: "MedlinePlus, Choking: adult or child over 1 year",
    url: "https://medlineplus.gov/ency/article/000049.htm",
  },
  snake1: {
    title: "ВОЗ, первая помощь при укусах змей",
    url: "https://www.who.int/teams/control-of-neglected-tropical-diseases/snakebite-envenoming/treatment",
  },
  snake2: {
    title: "MedlinePlus, Snake bites",
    url: "https://medlineplus.gov/ency/article/000031.htm",
  },
  frost1: {
    title: "NHS 111 Wales, Frostbite",
    url: "https://111.wales.nhs.uk/frostbite",
  },
  frost2: {
    title: "St John Ambulance Australia, памятка по обморожению",
    url: "https://stjohn.org.au/app/uploads/2025/08/Fact-sheets_frost-bite.pdf",
  },
  pois1: {
    title: "British Red Cross, Poisoning: learn first aid",
    url: "https://redcross.org.uk/first-aid/learn-first-aid/poisoning",
  },
  pois2: {
    title: "Royal Hospital for Children Glasgow, Poisoning",
    url: "https://rhc.nhsggc.org.uk/royal-hospital-for-children-for-patients-carers-visitors/about-your-childs-health-information-resources/concerned-about-accidents-and-injuries/poisoning/",
  },
  fever: {
    title: "GPnotebook, рекомендации NICE по жаропонижающим у детей до 5 лет",
    url: "https://gpnotebook.com/pages/infectious-disease/nice-guidance-use-of-paracetamol-and-ibuprofen-for-management-of-fever-in-child-under-5-years-old",
  },
  mmr1: {
    title: "Healio о когортном исследовании Hviid et al., Annals of Internal Medicine 2019",
    url: "https://www.healio.com/news/primary-care/20190304/more-evidence-mmr-vaccine-does-not-cause-autism-even-in-atrisk-children",
  },
  mmr2: {
    title: "Кокрейновский обзор вакцин против кори, краснухи и паротита (CD004407)",
    url: "https://cochranelibrary.com/cdsr/doi/10.1002/14651858.CD004407.pub4/related-content",
  },
  tst1: {
    title: "CDC, памятка о кожной туберкулиновой пробе",
    url: "https://stacks.cdc.gov/view/cdc/11773/cdc_11773_DS1.pdf",
  },
  tst2: {
    title: "Nova Scotia Health, Tuberculin Skin Test",
    url: "https://www.nshealth.ca/sites/default/files/documents/1598-2024.01.20.pdf",
  },
  milk: {
    title: "Balfour-Lynn. Milk, mucus and myths. Arch Dis Child 2019",
    url: "http://dx.doi.org/10.1136/archdischild-2018-314896",
  },
  milk2: {
    title: "The Limbic, пересказ обзора о молоке и слизи",
    url: "https://thelimbic.com/?p=28832",
  },
  elp1: {
    title: "Marangu et al., Exogenous lipoid pneumonia in children: systematic review, 2019",
    url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC7106224",
  },
  elp2: {
    title: "Marangu et al., серия случаев липоидной пневмонии у младенцев, 2018",
    url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC6079933",
  },
  h2o2a: {
    title: "Систематический обзор отравлений перекисью водорода. Clinical Toxicology 2022",
    url: "https://informahealthcare.com/doi/full/10.1080/15563650.2022.2144745",
  },
  h2o2b: {
    title: "Maryland Poison Center, Hydrogen Peroxide Ingestions",
    url: "https://web.archive.org/web/20250907181313/https://mdpoison.com/media/SOP/mdpoisoncom/ToxTidbits/2014/March2014ToxTidbits.pdf",
  },
  coffee: {
    title: "The safety and effectiveness of self-administered coffee enema. Medicine 2020",
    url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC7478478",
  },
  neck1: {
    title: "AHA, комментарий к научному заявлению о манипуляциях на шее и расслоении артерий",
    url: "https://professional.heart.org/en/science-news/cervical-arterial-dissections-and-association-with-cervical-manipulative-therapy/commentary",
  },
  neck2: {
    title: "UNMC о заявлении AHA/ASA, 2014",
    url: "https://www.unmc.edu/newsroom/2014/08/07/neck-manipulation-may-be-associated-with-stroke/",
  },
  icp1: {
    title: "Интервью детского невролога о гипердиагностике в детской неврологии",
    url: "https://vk.ru/@doc_med-nevrolog-anastasiya-nosko-pro-giperdiagnostiku-v-detskoi-nev",
  },
  icp2: {
    title: "Справочник MSD, Врождённая гидроцефалия",
    url: "https://www.msdmanuals.com/ru-ru/professional/педиатрия/врожденные-неврологические-аномалии/врожденная-гидроцефалия",
  },
  noo1: {
    title: "Т—Ж, методы, которые не развивают речь",
    url: "https://t-j.ru/list/ne-razvivaut-rech/",
  },
  noo2: {
    title: "Т—Ж, недоизученные лекарства, которые выписывают детям",
    url: "https://t-j.ru/roditel-apteka/",
  },
  corv1: {
    title: "Wikipedia, Corvalol",
    url: "https://en.wikipedia.org/wiki/Corvalol",
  },
  corv2: {
    title: "Phenobarbital, глава фармакологического справочника (Taylor & Francis)",
    url: "https://www.taylorfrancis.com/chapters/mono/10.4324/9781315825748-59/phenobarbital-phenobarbitone-louis-pagliaro-ann-marie-pagliaro",
  },
  drip1: {
    title: "Кандыба. Ошибки в амбулаторной неврологической практике, часть II",
    url: "https://journals.eco-vector.com/RFD/article/download/3578/3198",
  },
  drip2: {
    title: "Нейропротекция при цереброваскулярных заболеваниях: критический обзор",
    url: "https://journals.rcsi.science/2075-5473/article/view/124572",
  },
  vsd1: {
    title: "Т—Ж, почему диагноза «вегетососудистая дистония» не существует",
    url: "https://t-j.ru/vsd/",
  },
  vsd2: {
    title: "«Медицинский совет», 2017: вегетососудистая дистония и тревожные расстройства",
    url: "https://www.med-sovet.pro/jour/article/download/2144/2127",
  },
  spine: {
    title:
      "Brinjikji et al., Imaging features of spinal degeneration in asymptomatic populations. AJNR 2015",
    url: "https://www.ajnr.org/content/36/4/811",
  },
  ectr1: {
    title: "East and North Hertfordshire NHS Trust, Cervical Ectropion",
    url: "https://www.enherts-tr.nhs.uk/wp-content/uploads/2020/11/Cervical-Ectropion-v1-10.2020.pdf",
  },
  ectr2: {
    title: "NHS Lothian, Cervical ectropion",
    url: "https://policyonline.nhslothian.scot/wp-content/uploads/2023/03/Cervical_ectropion.pdf",
  },
  bed1: {
    title: "Aleman et al., Bed rest during pregnancy for preventing miscarriage. Cochrane",
    url: "https://pubmed.ncbi.nlm.nih.gov/15846669/",
  },
  bed2: {
    title: "Cochrane PEARLS о постельном режиме при угрозе выкидыша",
    url: "https://www.globalfamilydoctor.com/member/Resources/PEARLS/Insufficientevidencetosupportbedrestforpreventingmiscarriage.aspx",
  },
  dou1: {
    title: "Office on Women's Health, Douching",
    url: "https://womenshealth.gov/a-z-topics/douching",
  },
  dou2: {
    title: "Office on Women's Health, памятка о спринцевании",
    url: "https://womenshealth.gov/sites/default/files/documents/fact-sheet-douching.pdf",
  },
  canc1: {
    title:
      "Johnson et al., Use of Alternative Medicine for Cancer and Its Impact on Survival. JNCI 2018",
    url: "https://read.qxmd.com/read/28922780/use-of-alternative-medicine-for-cancer-and-its-impact-on-survival",
  },
  canc2: {
    title:
      "Johnson et al., Complementary Medicine and Survival Among Patients With Curable Cancers. JAMA Oncology 2018",
    url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC6233773",
  },
  prism1: {
    title:
      "Coomarasamy et al., PRISM: прогестерон при кровотечении на раннем сроке. Health Technol Assess 2020",
    url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC7355406",
  },
  prism2: {
    title: "Miscarriage Association о рекомендациях NICE 2021 года по прогестерону",
    url: "https://www.miscarriageuk.org/research/the-prism-trial/",
  },
  wound1: {
    title: "NHS Wales, Cuts and grazes",
    url: "https://thepracticeofhealth.nhs.wales/clinics-services/self-help-care/minor-common-ailments/cuts-grazes/",
  },
  wound2: {
    title: "Health New Zealand, Cuts, scrapes and wounds first aid",
    url: "https://www.healthnz.govt.nz/health-topics/tests-and-treatments/emergencies-and-first-aid/cuts-scrapes-and-wounds-first-aid",
  },
  wound3: {
    title: "Royal Children's Hospital Melbourne, Cuts, grazes and lacerations",
    url: "https://www.rch.org.au/kidsinfo/fact_sheets/Cuts,_grazes,_and_lacerations/",
  },
  bmn1: {
    title: "Apollo Pharmacy, солевые капли при заложенности носа у новорождённых",
    url: "https://www.apollopharmacy.in/momverse/a/saline-drops-newborn-congestion",
  },
  bmn2: {
    title: "The Bump, мнение педиатра о заложенности носа у младенцев",
    url: "https://thebump.com/a/baby-congestion",
  },
  epl1: {
    title:
      "Veterans Affairs Cooperative Study of polyenylphosphatidylcholine in alcoholic liver disease, 2003",
    url: "https://pubmed.ncbi.nlm.nih.gov/14634492/",
  },
  epl2: {
    title: "Pharmafile об исследовании EXCEL при жировой болезни печени, 2026",
    url: "https://pharmafile.com/news/study-suggests-phospholipid-therapy-may-impact-fatty-liver-disease-outcomes/",
  },
  igg1: {
    title: "CSACI Position statement on the testing of food-specific IgG, 2012",
    url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC3443017",
  },
  igg2: {
    title: "EAACI Task Force Report: Testing for IgG4 against foods is not recommended, 2008",
    url: "https://pubmed.ncbi.nlm.nih.gov/18489614/",
  },
  diet1: {
    title: "WIC, Breastfeeding? No Need for Diet Rules (со ссылками на CDC)",
    url: "https://livewell.wicresources.org/blog/breastfeeding-no-need-for-diet-rules",
  },
  diet2: {
    title:
      "Qualitative study of maternal dietary restriction and infant colic. Can Fam Physician 2019",
    url: "https://pubmed.ncbi.nlm.nih.gov/30867180/",
  },
  abm1: {
    title: "La Leche League Canada, пересказ протокола ABM № 36 о мастите",
    url: "https://www.lllc.ca/mastitis",
  },
  abm2: {
    title: "Minnesota Department of Health, Mastitis: updated guidance",
    url: "https://www.health.mn.gov/docs/people/wic/localagency/topicmonth/mastitis.pdf",
  },
  iod1: {
    title: "Linder et al., Iodine and hypothyroidism in neonates. Arch Dis Child 1997",
    url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC1720709",
  },
  iod2: {
    title:
      "Pinsker et al., Transient hypothyroidism in premature infants after topical iodine, 2013",
    url: "https://doaj.org/article/b6ee10b59fe74a3a8f2bdd6376422cc9",
  },
  hpv1: {
    title: "CDC, About Genital HPV Infection",
    url: "https://www.cdc.gov/sti/about/about-genital-hpv-infection.html",
  },
  hpv2: {
    title: "American Cancer Society, HPV (Human Papillomavirus)",
    url: "https://www.cancer.org/cancer/risk-prevention/hpv.html",
  },
  us1: {
    title: "Torloni et al., Safety of ultrasonography in pregnancy: WHO systematic review, 2009",
    url: "https://pubmed.ncbi.nlm.nih.gov/19291813/",
  },
  us2: {
    title: "Health Feedback, разбор утверждений о вреде пренатального УЗИ",
    url: "https://science.feedback.org/review/prenatal-ultrasound-is-generally-safe-when-performed-by-trained-personnel-and-used-only-when-medically-necessary-its-benefits-outweigh-the-risks/",
  },
  fe2: {
    title: "Памятка для врачей по внутривенному железу по итогам процедуры EMA (HPRA)",
    url: "https://assets.hpra.ie/products/Human/23247/3139df3a-e859-45c7-a89e-48fa6ce919af.pdf",
  },
  staph: {
    title: "CDC, основные сведения об устойчивом золотистом стафилококке (MRSA)",
    url: "https://www.cdc.gov/mrsa/about/index.html",
  },
  cat1: {
    title:
      "Bierowiec и соавт., золотистый стафилококк у здоровых домашних кошек (BioMed Research International, 2016)",
    url: "https://pubmed.ncbi.nlm.nih.gov/27766257/",
  },
  cat2: {
    title:
      "Cotter и соавт., носительство MRSA у питомцев в домах с больным человеком (Veterinary Dermatology, 2023)",
    url: "https://pubmed.ncbi.nlm.nih.gov/36331035/",
  },
  cat3: {
    title:
      "Loeffler и Lloyd, домашние животные как резервуар MRSA: обзор (Epidemiology and Infection, 2010)",
    url: "https://pubmed.ncbi.nlm.nih.gov/20056014/",
  },
} satisfies Record<string, Source>;

export type SourceId = keyof typeof sources;
