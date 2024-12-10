interface LoadingProps {
  children: React.ReactNode;
}

const Loading: React.FC<LoadingProps> = ({ children }) => (
  <div className="flex items-center justify-center h-full">
    <p className="text-lg font-semibold text-gray-600 animate-pulse">{children}</p>
  </div>
);

export default Loading;
