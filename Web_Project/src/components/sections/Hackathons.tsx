import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Calendar, MapPin, Users, Trophy, Code } from 'lucide-react';
import { hackathons } from '../../data/hackathons';

const Hackathons: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="hackathons" className="section bg-dark">
      <div className="container-custom">
        <motion.h2
          className="section-title text-light mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          ref={ref}
        >
          Hackathons & Competitions
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {hackathons.map((hackathon, index) => (
            <motion.div
              key={hackathon.id}
              className="card bg-dark-lighter border border-dark-light hover:border-primary-500/30 transition-all duration-300 group"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="relative overflow-hidden rounded-t-xl">
                <img
                  src={hackathon.image}
                  alt={hackathon.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4">
                  <div className="bg-primary-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {hackathon.position}
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-light mb-2 group-hover:text-primary-400 transition-colors">
                  {hackathon.name}
                </h3>

                <div className="flex flex-wrap gap-4 mb-4 text-sm text-light/70">
                  <div className="flex items-center gap-1">
                    <Calendar size={16} />
                    <span>{hackathon.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin size={16} />
                    <span>{hackathon.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users size={16} />
                    <span>Team of {hackathon.teamSize}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold text-primary-400 mb-1">Project: {hackathon.project}</h4>
                  <p className="text-light/80 text-sm leading-relaxed">
                    {hackathon.description}
                  </p>
                </div>

                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {hackathon.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-2 py-1 bg-primary-500/20 text-primary-300 rounded text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-dark-light">
                  <div className="flex items-center gap-2 text-success-400">
                    <Trophy size={16} />
                    <span className="text-sm font-medium">{hackathon.prize}</span>
                  </div>
                  <div className="flex items-center gap-1 text-light/60">
                    <Code size={16} />
                    <span className="text-sm">Hackathon</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <p className="text-light/70 mb-6">
            Passionate about collaborative problem-solving and innovation through hackathons
          </p>
          <div className="flex justify-center gap-8 text-center">
            <div>
              <div className="text-2xl font-bold text-primary-400">{hackathons.length}</div>
              <div className="text-sm text-light/60">Hackathons</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-success-400">
                {hackathons.filter(h => 
                  h.position.toLowerCase().includes('1st') || 
                  h.position.toLowerCase().includes('winner') ||
                  h.position.toLowerCase().includes('first') ||
                  h.position.toLowerCase().includes('place')
                ).length}
              </div>
              <div className="text-sm text-light/60">Wins & Placements</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary-300">
                {new Set(hackathons.flatMap(h => h.technologies)).size}
              </div>
              <div className="text-sm text-light/60">Technologies</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hackathons;