export function ContentPlaceholder({ message }: { message: string }) {
  return (
    <div className="empty-auctions">
      <p>{message}</p>
    </div>
  );
}
