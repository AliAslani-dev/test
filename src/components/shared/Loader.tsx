export default function Loader({ children }: { children?: React.ReactNode }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div
        style={{
          width: 50,
          height: 50,
          border: "6px solid #f3f3f3",
          borderTop: "6px solid #4F46E5",
          borderRadius: "50%",
          animation: "spin 1s linear infinite",
        }}
      />
      {children}
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
}
