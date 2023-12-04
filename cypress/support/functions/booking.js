
export class Booking {

    searchFor(text){
        const name = text.toLowerCase()
        cy.log('test: ' + name)
        cy.get('[data-cy="rosa-typeahead--input"]').first().type(name)
        cy.get(`[data-cy="${name.replace(/\s/g, "-")}"]`).should("be.visible").click()
    }

    chooseLocation({index}){
        cy.get('[data-cy="booking-steps__step-title"]').should("be.visible")
        cy.get('[data-cy="step-radio-option__label"]').eq(index).click()
    }

    firstTimeVisit({index}){
        cy.get('[data-cy="booking-steps__step-title"]').should("contain", "Is it the first time you see this practitioner?")
        cy.get('[data-cy="step-radio-option__label"]').eq(index).click()
    }

    getConfirmationCode(inboxID) {
        let confirmationCode
        cy.waitForLatestEmail(inboxID).then((email) => {

            console.log(`test: ${email}`)
            console.log(`test: ${email.body}`)
            assert.isDefined(email);

            const regex = /<p class="text text--xl text--bold color--highlight-main"[^>]*>\s*([0-9]+)\s*<\/p>/i;
            const match = email.body.match(regex);
            confirmationCode = match[1]

            console.log('Verification Code:', confirmationCode);
            cy.get('[data-cy="passwordless-login_code"]').type(confirmationCode)
        })
    }

    validateBookingConfirmation(inboxID){
        cy.waitForLatestEmail(inboxID).then((email) => {
            console.log(`test: ${email.subject}`)
            expect(email.subject).to.equal('Appointment confirmation');
        })
    }
}
export const booking = new Booking()