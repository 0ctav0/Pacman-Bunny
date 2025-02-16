export interface IView {
  Render(deltaTime: number): () => void;
}
