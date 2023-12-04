///<reference types = "cypress"/>
import { booking } from "../support/functions/booking"
import bookingData from "../fixtures/bookingData.json"
const axios = require('axios')
const nodemailer = require('nodemailer')

describe('Patient Booking application', () => {

    before(() => {

        cy.visit("https://staging-patient-booking.rosa.be/en/")
    })

    it('As a Patient, I should be able to book an appointment with the Doctor', () => {

        cy.get('[data-cy="header__rosa-home-link"]').should("be.visible")
        cy.get('[data-cy="cookie-policy__agree"]').click()
        booking.searchFor(bookingData.name)
        cy.get('[data-cy="hp-detail__book-booking-widget-cta"]').should("be.visible").click()

        cy.log('choose the location')
        booking.chooseLocation({
            index : 0
        })

        cy.log('Is it the first time you see this practitioner?')
        booking.firstTimeVisit({
            index : 0
        })

        cy.log('Choose a reason for your visit')
        cy.contains('Choose a reason for your visit')
        cy.get('[data-cy="step-radio-option__label"]').click()

        cy.log('Choose the 1st available slot and continue')
        cy.contains('Choose an availability')
        cy.get('[data-cy="booking-steps__load-more-availabilities"]').click()
        cy.wait(1000)
        cy.get('[data-cy^="availability-results__day-slots__slot-"]').eq(0).click()
        cy.get('[data-cy="booking-review__next-btn"]').click()

        cy.log('Enter the Email address and continue')
        cy.contains('Fill in your email to continue')
        cy.get('[data-cy="passwordless-login-email__form--email"]').type(bookingData.mailSlurp.emailId)
        cy.get('[data-cy="passwordless-login-email__form--submit"]').click()
        cy.contains('Check your email for a code')
        cy.wait(20000) //wait for the mail to be received

        cy.log('Get the confirmation code and enter the code')
        booking.getConfirmationCode(bookingData.mailSlurp.inboxID)
        cy.get('[data-cy="passwordless-login_code-button"]').click()

        cy.contains('Add the patient details')
        cy.contains('test test')
        cy.get('[data-cy="booking-review__confirm-btn"]').click()
        cy.contains('Your appointment is confirmed!')
        cy.wait(30000) //wait for the mail to be received

        cy.log('validate the confirmation message in the email')
        booking.validateBookingConfirmation(bookingData.mailSlurp.inboxID)
    })
})