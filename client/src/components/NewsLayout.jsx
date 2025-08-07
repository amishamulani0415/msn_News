import React, { useState, useEffect } from 'react';
const newsData = [
    {
        img: 'https://i.ibb.co/MJc26Q0/newsimg5.jpg',
        title: 'Global Markets Rally as Tech Stocks Surge',
        Description: `Global markets experienced a significant rally today as leading technology companies reported stronger-than-expected earnings for the quarter. Investors reacted positively to the news, driving major stock indices upward by more than 2% in most regions. Experts attribute the surge to growing consumer confidence and a rebound in digital infrastructure investments post-pandemic. Companies like Apple, Google, and Amazon led the charge, with each showing impressive gains. Analysts say this upward trend could continue if inflation remains stable and interest rates don’t rise sharply. Another factor contributing to the rally is the increase in demand for AI and cloud computing solutions, both of which have seen record-high adoption rates across various industries. In Europe, the DAX and FTSE also closed higher, mirroring gains in the US and Asia. Economists warn, however, that global debt levels and geopolitical tensions could still cause market volatility in the coming months. Nevertheless, investors are optimistic that technology will continue to be a driving force behind global economic recovery. With innovation in renewable energy, biotech, and fintech attracting fresh capital, financial experts are advising long-term investment strategies focused on sustainability and digital transformation. This marks one of the most robust days of trading in 2025 so far, with over $300 billion in global equity trades recorded.`
    },
    {
        img: 'https://i.ibb.co/tMH8SSGT/newsimg4.jpg',
        title: 'Climate Summit 2024: Key Takeaways',
        Description: `The Climate Summit 2024, held in Geneva, brought together over 190 nations in a landmark conference aimed at addressing global climate change. Leaders from across the world agreed to a new international framework that aims to cut global carbon emissions by 60% by the year 2040. Among the most notable outcomes was the Global Renewable Pact, a plan that commits countries to investing heavily in solar, wind, and hydro power. Another significant development was the establishment of a $100 billion fund dedicated to helping developing nations transition to green energy while strengthening their disaster response systems. Activists and scientists lauded the agreement, calling it the most ambitious climate action plan since the Paris Agreement. The summit also emphasized the role of youth in climate activism, with over 1,000 young leaders participating in roundtable discussions. Technology played a major role as well, with presentations on new carbon capture methods, satellite-based forest monitoring, and AI-powered sustainability tools. Critics argue the commitments may not be enough to limit global temperature rise to 1.5°C, especially without strict enforcement mechanisms. However, the political will on display offered hope that the world may finally be on a unified path toward environmental sustainability. The summit concluded with a powerful address by UN Secretary-General who emphasized that the time for talk is over, and now is the time for action.`
    },
    {
        img: 'https://i.ibb.co/G3Wwn538/newsimg3.jpg',
        title: 'Breakthrough in Renewable Energy Announced',
        Description: `In a groundbreaking announcement today, researchers at the International Institute for Sustainable Energy revealed a new solar panel technology that boasts an efficiency rate of over 50%, nearly double that of current commercial panels. This innovation is expected to revolutionize how we harness the sun’s energy, making renewable electricity more affordable and accessible than ever before. The new material, called perovskite-tandem, allows panels to capture a broader spectrum of sunlight and convert it into usable energy at unprecedented rates. Backed by both private and government funding, the research team has already begun pilot installations in test cities across Europe and Asia. Experts believe this advancement could significantly reduce our dependency on fossil fuels and accelerate the transition to carbon-neutral economies. In addition to energy efficiency, the new panels are more durable and lightweight, making them ideal for installation on residential rooftops, electric vehicles, and even clothing. Analysts predict that by 2030, this technology will be widely adopted, reducing household electricity costs by 40%. Governments are encouraged to update their infrastructure policies to accommodate this change, ensuring power grids can handle the increased input from distributed renewable sources. The announcement has already sent ripples through the global energy market, with stocks in traditional oil and gas companies showing signs of decline. Climate advocates welcomed the news as a major step toward meeting the goals outlined in the Paris Agreement.`
    },
    {
        img: 'https://i.ibb.co/ymVgpnYb/newsimg2.jpg',
        title: 'Sports Update: Champions League Final Results',
        Description: `The Champions League final came to a thrilling conclusion last night in Istanbul, where Manchester United triumphed over Real Madrid with a nail-biting 3-2 victory. The match, hailed as one of the greatest finals in modern football history, kept fans on the edge of their seats until the very last whistle. The game began with Real Madrid taking an early lead in the 12th minute thanks to a goal by Vinícius Júnior. However, Manchester United quickly responded, with Bruno Fernandes equalizing with a powerful free kick in the 24th minute. The intensity of the match escalated in the second half, as both teams demonstrated exceptional skill and determination. In the 73rd minute, Marcus Rashford scored a spectacular goal, pushing United ahead. Madrid wasn't done yet, equalizing again in the 85th minute, setting the stage for a dramatic finish. Just when extra time seemed inevitable, United's young forward Alejandro Garnacho stunned the crowd with a solo effort that found the back of the net in the 90th minute. The stadium erupted in celebration as Manchester United secured their fifth Champions League title. Fans around the world flooded social media with praise for the team's resilience and strategy. The victory marks a turning point for the club, ending a five-year trophy drought and placing manager Erik ten Hag among the club's legendary coaches.`
    },
    {
        img: 'https://i.ibb.co/fVGLvrWC/newsimg.jpg',
        title: 'Healthcare Advances: AI Aids Early Cancer Detection',
        Description: `Medical researchers have developed an advanced AI system capable of detecting early signs of cancer with remarkable accuracy, according to a new study published in the Journal of Medical Innovation. The tool, trained on millions of patient records and imaging data, can analyze X-rays, MRIs, and blood test results in real-time to identify anomalies that may indicate the presence of cancerous cells. During clinical trials, the AI showed a 92% success rate in identifying breast, lung, and prostate cancers before traditional symptoms appeared. This development could drastically improve survival rates by enabling earlier intervention and personalized treatment plans. Doctors are already using the tool in pilot programs across several hospitals in the US and UK, where patients have praised its speed and accuracy. In one case, a tumor missed by human radiologists was successfully flagged by the AI, prompting immediate treatment. Beyond detection, the system is being enhanced to recommend follow-up procedures, such as biopsies or scans, based on patient history and genetic data. Experts believe AI-powered diagnostics will become a cornerstone of future healthcare, reducing costs and eliminating human error. However, they caution that such systems should complement—not replace—medical professionals. The technology has been approved for use under certain regulatory conditions and is expected to be widely available within the next two years.`
    },
    {
        img: 'https://i.ibb.co/MJc26Q0/newsimg5.jpg',
        title: 'Tech Giants Face New Antitrust Scrutiny in EU',
        Description: `European Union regulators have launched a new wave of antitrust investigations targeting some of the world’s largest technology firms. The inquiry focuses on allegations that companies like Meta, Amazon, and Google have used their dominant market positions to suppress competition and control user data unfairly. According to EU officials, the move is part of a broader initiative to ensure fair competition and protect consumer rights in the digital economy. The Digital Markets Act (DMA), which took effect earlier this year, grants the EU more authority to monitor and penalize tech monopolies. If violations are found, companies could face fines amounting to 10% of their global revenue. In a press briefing, the European Commissioner for Competition emphasized that “no company is above the law,” and that transparency and accountability are essential in the tech sector. The companies under investigation have issued statements denying the allegations and expressing willingness to cooperate. Legal experts predict that the outcome of these cases could reshape how big tech operates in Europe, potentially forcing them to unbundle services or open access to competitors. Consumer advocacy groups have welcomed the investigation, calling it long overdue. Meanwhile, critics argue that excessive regulation could stifle innovation. The coming months will be critical as the legal battles unfold and the EU attempts to balance market fairness with technological progress.`
    },
    {
        img: 'https://i.ibb.co/G3Wwn538/newsimg3.jpg',
        title: 'NASA Plans Manned Mission to Mars by 2035',
        Description: `NASA has announced an ambitious plan to send humans to Mars by 2035, marking a major milestone in space exploration. The mission, named “Orion Pathfinder,” aims to establish the first permanent human presence on the Red Planet. As part of the preparation, NASA will first return astronauts to the Moon under its Artemis program, testing long-term habitation and advanced propulsion systems. Engineers are already testing spacecraft components at the Kennedy Space Center, while astronauts undergo rigorous physical and psychological training. The Mars mission will include multiple stages: a cargo module will be launched in 2030 to pre-position essential supplies and infrastructure, followed by the crewed mission five years later. The spacecraft will feature radiation-shielded cabins, hydroponic food systems, and AI co-pilots. International collaboration is key, with the European Space Agency and Japan’s JAXA playing critical roles in mission logistics and data sharing. Scientists expect to conduct groundbreaking research on Mars' geology, climate, and potential microbial life. The mission has captured the public’s imagination, and recruitment for astronauts has reached record levels. While technical and ethical challenges remain, including the psychological toll of isolation and the risk of equipment failure, NASA is confident that humanity is ready for its next giant leap.`
    },
    {
        img: 'https://i.ibb.co/ymVgpnYb/newsimg2.jpg',
        title: 'Local Startups Drive Economic Growth in 2025',
        Description: `Small and mid-sized startups are fueling economic recovery across the globe in 2025. With increased access to digital tools and government-backed incentives, young entrepreneurs are launching innovative ventures in healthcare, fintech, e-commerce, and education. In cities like Bangalore, Berlin, and Toronto, startup ecosystems are thriving thanks to low-interest loans, mentorship hubs, and tax benefits for tech-driven initiatives. A recent report by the Global Innovation Index shows that 70% of new job creation this year is linked to startup growth. One standout story is that of MedGenix, a Bangalore-based telehealth startup that now serves over 2 million patients across India. In addition to economic benefits, these startups are also contributing to social change, focusing on sustainability, digital literacy, and inclusive hiring practices. Investors are taking note too—venture capital funding in the first half of 2025 surpassed $200 billion globally, a 15% rise from the previous year. Governments are now working to reduce bureaucratic hurdles and improve infrastructure, ensuring long-term support for emerging businesses. Analysts say this shift could redefine the global economy by decentralizing innovation and reducing dependence on multinational giants. The trend also reflects a generational shift, as younger people prioritize impact and purpose over profit alone.`
    },
    {
        img: 'https://i.ibb.co/fVGLvrWC/newsimg.jpg',
        title: 'Global Cybersecurity Alert After Major Data Breach',
        Description: `A major cybersecurity incident has triggered a global alert after a prominent cloud service provider confirmed a large-scale data breach affecting millions of users worldwide. Initial reports suggest that the breach was caused by a vulnerability in third-party software used to manage encrypted user sessions. Sensitive data including emails, financial information, and login credentials may have been compromised. Cybersecurity firms are now working closely with law enforcement agencies across North America, Europe, and Asia to trace the attackers, who are believed to be part of a well-coordinated ransomware group. The breach has sparked renewed debate about digital privacy and the need for stricter global cybersecurity standards. Experts are urging users to immediately change passwords, enable two-factor authentication, and monitor accounts for suspicious activity. Governments are also stepping in, with emergency meetings being held to assess infrastructure risks and mandate transparency from affected corporations. The incident has already impacted stock prices for several tech companies and prompted lawsuits from consumer advocacy groups. While investigations continue, the event serves as a grim reminder of the vulnerabilities that persist in our increasingly connected world. Industry leaders are now calling for an international cybersecurity treaty to improve incident response and threat intelligence sharing.`
    }
];

function NewsLayout() {
    const [selectedNews, setSelectedNews] = useState(null);

    // Prevent background scroll when modal is open
    useEffect(() => {
        if (selectedNews) {
            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
        }
        // Clean up on unmount
        return () => document.body.classList.remove('overflow-hidden');
    }, [selectedNews]);

    return (
        <div className="relative">
            {/* Main content, blurred when modal is open */}
            <div className={selectedNews ? 'filter blur-sm pointer-events-none select-none' : ''}>
                <div className='flex flex-wrap justify-center'>
                    {newsData.map((news, index) => (
                        <div
                            key={index}
                            className="newscard  sm:w-1/2 md:w-1/3 lg:w-1/4 m-2 bg-[#e0ebeb] rounded-lg p-4 cursor-pointer hover:shadow-lg transition-shadow duration-200"
                            onClick={() => setSelectedNews(news)}
                        >
                            <div className='w-full h-48 sm:h-56 md:h-60'>
                                <img src={news.img} alt="News" className='rounded-lg h-full w-full object-cover' />
                            </div>
                            <h1 className='font-semibold text-xl mt-2 mb-2'>{news.title}</h1>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal */}
            {selectedNews && (
                <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm px-2">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-4xl mx-auto p-4 sm:p-8 md:p-10 relative animate-fade-in">
                        <button
                            className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl font-bold focus:outline-none"
                            onClick={() => setSelectedNews(null)}
                            aria-label="Close modal"
                        >
                            &times;
                        </button>
                        <div className="flex flex-col items-center">
                            <img src={selectedNews.img} alt="News" className="rounded-lg w-full max-h-48 sm:max-h-60 md:max-h-72 object-cover mb-4" />
                            <h2 className="font-bold text-2xl mb-2 w-full text-left">{selectedNews.title}</h2>
                            <p className="text-gray-700 text-base mt-2 max-h-60 overflow-y-auto text-justify">
                                {selectedNews.Description}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
export default NewsLayout;