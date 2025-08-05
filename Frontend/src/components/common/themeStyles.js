import { useSelector } from "react-redux";

export const useThemeStyles = () => {
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);

  // Custom color palette
  const colors = {
    crimsonRed: "#B22222",
    gunmetalGray: "#2C2C2C",
    gold: "#FFD700",
    ivoryWhite: "#FDF6EC",
    steelBlue: "#4682B4",
    gradient: "linear-gradient(90deg, #B22222, #2C2C2C)"
  };

  // --- Reusable Tailwind classes ---
  return {
    isDarkMode,
    colors,

    inputClass: `rounded border px-2 py-1 w-full text-sm focus:outline-none focus:ring-2 focus:ring-[${colors.gold}] ${
      isDarkMode
        ? `bg-[${colors.gunmetalGray}] border-gray-600 text-[${colors.ivoryWhite}]`
        : `bg-white border-gray-300 text-gray-900`
    }`,

    labelClass: `${isDarkMode ? "text-[#FDF6EC]" : "text-gray-700"} font-medium mb-1`,

    btnClass: `px-4 py-2 rounded font-semibold transition-colors disabled:opacity-60 ${
      isDarkMode
        ? `bg-[${colors.crimsonRed}] text-white hover:bg-[${colors.gold}]`
        : `bg-[${colors.gold}] text-[${colors.gunmetalGray}] hover:bg-[${colors.crimsonRed}]`
    }`,

    tableClass: `min-w-full divide-y ${isDarkMode ? "divide-gray-700" : "divide-gray-200"}`,

    thClass: `px-2 py-2 text-left text-xs font-bold uppercase ${
      isDarkMode
        ? `text-[${colors.gold}] bg-[${colors.gunmetalGray}]`
        : `text-[${colors.crimsonRed}] bg-orange-50`
    }`,

    tdClass: `px-2 py-2 whitespace-nowrap text-sm ${
      isDarkMode ? "text-[#FDF6EC]" : "text-gray-800"
    }`,

    rowHover: `transition-colors ${isDarkMode ? "hover:bg-[#1f1f1f]" : "hover:bg-orange-50"}`,

    cardBg: isDarkMode ? "bg-[#2C2C2C]" : "bg-white",

    borderColor: isDarkMode ? "border-gray-700" : "border-gray-200",

    text: {
      heading: `font-bold text-xl ${
        isDarkMode ? "text-[#FFD700]" : "text-[#B22222]"
      }`,
      subheading: `text-base ${
        isDarkMode ? "text-[#FDF6EC]" : "text-gray-700"
      }`,
      link: `underline ${
        isDarkMode ? "text-[#4682B4] hover:text-[#FFD700]" : "text-[#B22222] hover:text-[#4682B4]"
      }`,
    },

    bgGradient: `bg-[${colors.gradient}]`,
  };
};
