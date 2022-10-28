export function SearchInput() {
  return (
    <div className="field">
      <p className="control has-icons-left">
        <input
          className="input is-rounded"
          type="text"
          placeholder="what did you want?"
        />
        <span className="icon is-small is-left">
          <i className="fa-solid fa-magnifying-glass"></i>
        </span>
      </p>
    </div>
  );
}
