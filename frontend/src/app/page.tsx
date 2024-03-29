export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <video width="400" controls>
        <source
          src="https://25693.live.streamtheworld.com/LOS40_SC"
          type="audio/mpeg"
        />
        Your browser does not support HTML video.
      </video>
    </main>
  );
}
