// components/AboutPage.js - About Page Component
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  Users, 
  Heart, 
  Award, 
  Target, 
  Shield, 
  Globe, 
  Mail, 
  Phone, 
  MapPin, 
  Twitter, 
  Facebook, 
  Instagram, 
  Linkedin,
  Github,
  CheckCircle,
  ArrowRight,
  Zap,
  TrendingUp,
  Calendar
} from 'lucide-react';

const AboutPage = () => {
  const team = [
    {
      name: "Sarah Johnson",
      role: "CEO & Founder",
      bio: "Passionate about creating meaningful connections between writers and readers.",
      avatar: "https://picsum.photos/seed/sarah/100/100.jpg",
      social: {
        twitter: "#",
        linkedin: "#"
      }
    },
    {
      name: "Alex Chen",
      role: "CTO",
      bio: "Building the technology that powers our community of creators.",
      avatar: "https://picsum.photos/seed/alex/100/100.jpg",
      social: {
        twitter: "#",
        github: "#"
      }
    },
    {
      name: "Emma Wilson",
      role: "Head of Community",
      bio: "Fostering a welcoming environment for writers and readers to connect.",
      avatar: "https://picsum.photos/seed/emma/100/100.jpg",
      social: {
        twitter: "#",
        instagram: "#"
      }
    },
    {
      name: "Mike Davis",
      role: "Lead Designer",
      bio: "Creating beautiful experiences that make reading a joy.",
      avatar: "https://picsum.photos/seed/mike/100/100.jpg",
      social: {
        twitter: "#",
        dribbble: "#"
      }
    }
  ];

  const stats = [
    { number: "10K+", label: "Active Writers", icon: Users },
    { number: "500K+", label: "Monthly Readers", icon: Heart },
    { number: "50K+", label: "Published Articles", icon: BookOpen },
    { number: "100+", label: "Countries", icon: Globe }
  ];

  const values = [
    {
      title: "Authentic Voices",
      description: "We believe in genuine, thoughtful content that adds real value to readers' lives.",
      icon: Heart
    },
    {
      title: "Community First",
      description: "Our platform is built around fostering meaningful connections between writers and readers.",
      icon: Users
    },
    {
      title: "Quality Content",
      description: "We maintain high standards for content to ensure the best reading experience.",
      icon: Award
    },
    {
      title: "Innovation",
      description: "Continuously improving our platform to serve our community better.",
      icon: Zap
    }
  ];

  const TimelineItem = ({ year, title, description }) => (
    <div className="flex">
      <div className="flex flex-col items-center mr-4">
        <div className="w-3 h-3 bg-green-600 rounded-full"></div>
        <div className="w-0.5 h-16 bg-green-600"></div>
      </div>
      <div>
        <h4 className="font-semibold text-gray-900">{year}</h4>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  );

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-green-600 to-green-700 text-white">
        <div className="container-responsive py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">About Notely</h1>
            <p className="text-xl md:text-2xl text-green-100 max-w-3xl mx-auto">
              Where writers and readers come together to share stories, ideas, and inspiration
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/signup" 
                className="px-6 py-3 bg-white text-green-600 rounded-lg hover:bg-gray-100 transition-colors font-medium flex items-center justify-center"
              >
                Start Writing
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link 
                to="/discover" 
                className="px-6 py-3 bg-transparent border-2 border-white text-white rounded-lg hover:bg-white hover:text-green-600 transition-colors font-medium flex items-center justify-center"
              >
                Explore Content
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="container-responsive py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                  <Icon className="h-8 w-8 text-green-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900">{stat.number}</div>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mission Section */}
      <div className="container-responsive py-12">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
          <p className="text-lg text-gray-600 mb-8">
            Notely is dedicated to creating a vibrant community where writers can share their authentic voices 
            and readers can discover meaningful content. We believe in the power of storytelling to connect, 
            inspire, and transform lives.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <Target className="h-8 w-8 text-green-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Our Vision</h3>
              <p className="text-gray-600">
                To be the most trusted platform for authentic content creation and discovery.
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6">
              <Shield className="h-8 w-8 text-green-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Our Values</h3>
              <p className="text-gray-600">
                Authenticity, community, quality, and innovation guide everything we do.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-white py-12">
        <div className="container-responsive">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-green-50 rounded-full mb-4">
                    <Icon className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{value.title}</h3>
                  <p className="text-gray-600 text-sm">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Timeline Section */}
      <div className="container-responsive py-12">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Our Journey</h2>
        <div className="max-w-3xl mx-auto">
          <div className="space-y-6">
            <TimelineItem 
              year="2020" 
              title="Notely Founded" 
              description="Started with a simple idea: create a better platform for writers and readers." 
            />
            <TimelineItem 
              year="2021" 
              title="First 1,000 Writers" 
              description="Reached our first major milestone with a growing community of talented writers." 
            />
            <TimelineItem 
              year="2022" 
              title="Platform Redesign" 
              description="Launched our new interface with enhanced features and improved user experience." 
            />
            <TimelineItem 
              year="2023" 
              title="Global Expansion" 
              description="Expanded to serve readers and writers from over 100 countries worldwide." 
            />
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-gray-100 py-12">
        <div className="container-responsive">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="text-center">
                <img 
                  src={member.avatar} 
                  alt={member.name} 
                  className="w-24 h-24 rounded-full mx-auto mb-4 ring-4 ring-white shadow-lg"
                />
                <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
                <p className="text-green-600 mb-2">{member.role}</p>
                <p className="text-gray-600 text-sm mb-4">{member.bio}</p>
                <div className="flex justify-center space-x-3">
                  {member.social.twitter && (
                    <a href={member.social.twitter} className="text-gray-400 hover:text-blue-500 transition-colors">
                      <Twitter className="h-5 w-5" />
                    </a>
                  )}
                  {member.social.linkedin && (
                    <a href={member.social.linkedin} className="text-gray-400 hover:text-blue-700 transition-colors">
                      <Linkedin className="h-5 w-5" />
                    </a>
                  )}
                  {member.social.instagram && (
                    <a href={member.social.instagram} className="text-gray-400 hover:text-pink-500 transition-colors">
                      <Instagram className="h-5 w-5" />
                    </a>
                  )}
                  {member.social.github && (
                    <a href={member.social.github} className="text-gray-400 hover:text-gray-900 transition-colors">
                      <Github className="h-5 w-5" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-green-600 text-white py-12">
        <div className="container-responsive text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Whether you're a writer looking to share your voice or a reader seeking great content, 
            Notely is the place for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/signup" 
              className="px-6 py-3 bg-white text-green-600 rounded-lg hover:bg-gray-100 transition-colors font-medium flex items-center justify-center"
            >
              Start Writing
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link 
              to="/discover" 
              className="px-6 py-3 bg-transparent border-2 border-white text-white rounded-lg hover:bg-white hover:text-green-600 transition-colors font-medium flex items-center justify-center"
            >
              Explore Content
            </Link>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-white py-12">
        <div className="container-responsive">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Get in Touch</h3>
              <p className="text-gray-600 mb-4">Have questions? We'd love to hear from you.</p>
              <div className="space-y-2">
                <div className="flex items-center text-gray-600">
                  <Mail className="h-5 w-5 mr-2" />
                  <span>hello@notely.com</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Phone className="h-5 w-5 mr-2" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <MapPin className="h-5 w-5 mr-2" />
                  <span>San Francisco, CA</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link to="/about" className="text-gray-600 hover:text-green-600 transition-colors">About Us</Link></li>
                <li><Link to="/categories" className="text-gray-600 hover:text-green-600 transition-colors">Categories</Link></li>
                <li><Link to="/discover" className="text-gray-600 hover:text-green-600 transition-colors">Discover</Link></li>
                <li><Link to="/blog" className="text-gray-600 hover:text-green-600 transition-colors">Blog</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors">
                  <Twitter className="h-6 w-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-blue-700 transition-colors">
                  <Facebook className="h-6 w-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-pink-500 transition-colors">
                  <Instagram className="h-6 w-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-blue-700 transition-colors">
                  <Linkedin className="h-6 w-6" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;