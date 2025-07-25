import React, { useContext, useState } from 'react';
import { assets } from '../src/assets/assets';
import { motion } from 'framer-motion';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';

const Result = () => {
  const [image, setImage] = useState(assets.sample_img_2);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isImageGenerated, setIsImageGenerated] = useState(false);
  const { generateImage } = useContext(AppContext);
  const [input, setInput] = useState('');

  const handleGenerate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setIsImageLoaded(false);
    setIsImageGenerated(true);

    const result = await generateImage(input); // actual image from API
    if (result) {
      setImage(result);
    } else {
      // Replace this with your toast system if using react-toastify or similar
      toast.error ("Failed to generate image.");
    }

    setLoading(false);
  };

  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  const handleGenerateAnother = () => {
    setIsImageGenerated(false);
    setImage(assets.sample_img_1); // reset to preview image
    setIsImageLoaded(false);
    setLoading(false);
  };

  return (
    <motion.form
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onSubmit={handleGenerate}
      className="flex flex-col items-center justify-center gap-8 mt-12 px-4"
    >
      {/* Image display box */}
      <div className="relative w-full max-w-sm shadow-md">
        <img
          src={image}
          alt="Generated or Default"
          onLoad={handleImageLoad}
          className="rounded-lg object-cover w-full h-64"
        />
        <span
          className={`absolute bottom-0 left-0 h-1 bg-indigo-500 transition-all duration-[3s] ${
            loading ? 'w-0' : 'w-full'
          }`}
        ></span>
        <p className="absolute bottom-4 left-4 text-white font-semibold drop-shadow-sm">
          {loading ? 'Loading...' : isImageGenerated ? 'Generated!' : 'Preview'}
        </p>
      </div>

      {/* Input & button before generation */}
      {!isImageGenerated && (
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full max-w-xl">
          <input
            type="text"
            placeholder="Describe what you want to generate"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full px-5 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm transition-all"
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-3 rounded-full hover:scale-105 active:scale-95 transition-transform font-medium"
          >
            Generate
          </button>
        </div>
      )}

      {/* Action buttons after generation */}
      {isImageGenerated && (
        <div className="flex flex-col sm:flex-row gap-4 items-center mt-4">
          <button
            type="button"
            onClick={handleGenerateAnother}
            className="px-5 py-2 border border-indigo-500 text-indigo-600 rounded-full hover:bg-indigo-500 hover:text-white transition-colors"
          >
            Generate Another
          </button>
          <a
            href={image}
            download="generated-image.jpg"
            className="px-5 py-2 border border-purple-500 text-purple-600 rounded-full hover:bg-purple-500 hover:text-white transition-colors text-center"
          >
            Download
          </a>
        </div>
      )}
    </motion.form>
  );
};

export default Result;
