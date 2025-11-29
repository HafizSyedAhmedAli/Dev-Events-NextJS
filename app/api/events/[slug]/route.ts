import {NextRequest, NextResponse} from 'next/server';
import connectDB from '@/lib/mongodb';
import Event from '@/database/event.model';
import {Error as MongooseError} from 'mongoose';

interface RouteContext {
    params: Promise<{ slug: string }>;
}

/**
 * GET /api/events/[slug]
 * Fetches a single event by its slug
 */
export async function GET(
    request: NextRequest,
    context: RouteContext
): Promise<NextResponse> {
    try {
        // Await the params promise to extract slug
        const {slug} = await context.params;

        // Validate slug parameter
        if (!slug) {
            return NextResponse.json(
                {message: 'Invalid or missing slug parameter'},
                {status: 400}
            );
        }

        // Sanitize slug to prevent injection attacks
        const sanitizedSlug = slug.trim().toLowerCase();

        if (sanitizedSlug.length === 0) {
            return NextResponse.json(
                {message: 'Slug cannot be empty'},
                {status: 400}
            );
        }

        // Connect to database
        await connectDB();

        // Query event by slug
        const event = await Event.findOne({slug: sanitizedSlug});

        // Handle event not found
        if (!event) {
            return NextResponse.json(
                {message: `Event with slug '${sanitizedSlug}' not found`},
                {status: 404}
            );
        }

        // Return successful response
        return NextResponse.json(
            {
                message: 'Event fetched successfully',
                event,
            },
            {status: 200}
        );
    } catch (error) {
        console.error('Error fetching event by slug:', error);

        // Handle Mongoose validation errors
        if (error instanceof MongooseError.ValidationError) {
            return NextResponse.json(
                {
                    message: 'Validation error',
                    error: error.message,
                },
                {status: 400}
            );
        }

        // Handle Mongoose cast errors (invalid ObjectId format)
        if (error instanceof MongooseError.CastError) {
            return NextResponse.json(
                {
                    message: 'Invalid data format',
                    error: error.message,
                },
                {status: 400}
            );
        }

        // Handle generic errors
        return NextResponse.json(
            {
                message: 'Failed to fetch event',
                error: error instanceof Error ? error.message : 'Unknown error occurred',
            },
            {status: 500}
        );
    }
}
