;; pledge-for-action
;; A simple contract for making public, on-chain pledges for positive actions.

;; ---
;; Data maps and variables
;; ---

;; A map to store pledges, keyed by a unique uint ID.
;; key: pledge ID (uint)
;; value: { pledger: principal, message: (string-utf8 256), block: uint }
(define-map pledges uint { pledger: principal, message: (string-utf8 256), block: uint })

;; A counter for the total number of pledges, also used as the next pledge ID.
(define-data-var pledge-id-counter uint u0)

;; ---
;; Public functions
;; ---

;; @desc Makes a public pledge.
;; @param message: A string describing the pledge.
;; @returns (ok uint) with the new pledge ID.
(define-public (make-pledge (message (string-utf8 256)))
  (let ((next-id (+ (var-get pledge-id-counter) u1)))
    (map-set pledges next-id {
      pledger: tx-sender,
      message: message,
      block: block-height
    })
    (var-set pledge-id-counter next-id)
    (ok next-id)))

;; ---
;; Read-only functions
;; ---

;; @desc Retrieves a pledge by its ID.
;; @param id: The uint ID of the pledge.
;; @returns (some { pledger: principal, message: (string-utf8 256), block: uint }) or none if not found.
(define-read-only (get-pledge (id uint))
  (map-get? pledges id))

;; @desc Gets the total number of pledges made.
;; @returns The total count of pledges as a uint.
(define-read-only (get-pledge-count)
  (ok (var-get pledge-id-counter)))