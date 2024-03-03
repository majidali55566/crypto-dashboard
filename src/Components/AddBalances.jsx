function AddBalances() {
  return (
    <div className="add-balances">
      <div className="flex-group justify-space-between">
        <h1>Balances</h1>
        <img src="/images/plus-icon.png" alt="" width={32} height={32} />
      </div>
      <div className="flex-group align-items-center">
        <svg
          width="13"
          height="23"
          viewBox="0 0 13 23"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12.36 15.512C12.36 12.464 10.056 11.504 7.704 10.64V5.12C8.832 5.336 9.672 6.008 10.152 7.208L12.024 6.152C11.184 4.232 9.576 3.176 7.704 2.936V0.8H6.192V2.912C3.72 3.152 1.656 4.808 1.656 7.496C1.656 10.472 3.816 11.432 6.192 12.296V18.104C4.416 17.912 3.288 17.024 2.76 15.584L0.84 16.688C1.656 18.8 3.576 20.096 6.192 20.288V22.4H7.704V20.264C10.392 19.952 12.36 18.176 12.36 15.512ZM3.864 7.496C3.864 6.176 4.8 5.288 6.192 5.096V10.064C4.656 9.416 3.864 8.768 3.864 7.496ZM7.704 18.056V12.848C9.192 13.472 10.128 14.12 10.128 15.536C10.128 16.832 9.264 17.816 7.704 18.056Z"
            fill="#5A55D2"
          />
        </svg>

        <p className="balance-amount">9784.79</p>
      </div>
      <div>
        <img src="/images/debt-card.png" alt="" />
      </div>
    </div>
  );
}

export default AddBalances;
