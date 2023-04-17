export default interface CardProps {
  id?: string;
  cardName: string;
  onDelete: Function;
  onEdit: Function;
  transferFund?: boolean;
}
